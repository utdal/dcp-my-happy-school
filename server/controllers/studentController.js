import Student from '../models/Student.js';
import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Get all students
// @route   GET /api/students
// @access  Private/Admin,Teacher
export const getStudents = asyncHandler(async (req, res) => {
  const { grade, search } = req.query;
  let query = {};

  // Filter by grade if provided
  if (grade && grade !== 'all') {
    query.grade = grade;
  }

  // Search by name
  if (search) {
    query.name = { $regex: search, $options: 'i' };
  }

  // If user is parent, only show their children
  if (req.user.role === 'parent') {
    query.parents = req.user._id;
  }

  const students = await Student.find(query)
    .populate('parents', 'name email')
    .sort({ grade: 1, name: 1 });

  res.status(200).json({
    success: true,
    count: students.length,
    data: students
  });
});

// @desc    Get single student
// @route   GET /api/students/:id
// @access  Private
export const getStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id)
    .populate('parents', 'name email');

  if (!student) {
    return res.status(404).json({ success: false, message: 'Student not found' });
  }

  // Make sure user has access to this student
  if (req.user.role === 'parent' && !student.parents.some(parent => parent._id.toString() === req.user._id.toString())) {
    return res.status(403).json({ 
      success: false, 
      message: 'Not authorized to access this student' 
    });
  }

  res.status(200).json({
    success: true,
    data: student
  });
});

// @desc    Create new student
// @route   POST /api/students
// @access  Private/Admin
export const createStudent = asyncHandler(async (req, res) => {
  const { name, grade, enrollmentDate, status, parentEmails } = req.body;

  // Find parent users by email
  let parents = [];
  if (parentEmails && parentEmails.length > 0) {
    parents = await User.find({ 
      email: { $in: parentEmails },
      role: 'parent'
    });

    if (parents.length !== parentEmails.length) {
      return res.status(400).json({ 
        success: false, 
        message: 'One or more parent emails are invalid or not registered as parents' 
      });
    }
  }

  const student = await Student.create({
    name,
    grade,
    enrollmentDate: enrollmentDate || Date.now(),
    status: status || 'active',
    parents: parents.map(parent => parent._id)
  });

  res.status(201).json({
    success: true,
    data: student
  });
});

// @desc    Update student
// @route   PUT /api/students/:id
// @access  Private/Admin
export const updateStudent = asyncHandler(async (req, res) => {
  const { name, grade, enrollmentDate, status, parentEmails } = req.body;
  
  let student = await Student.findById(req.params.id);

  if (!student) {
    return res.status(404).json({ success: false, message: 'Student not found' });
  }

  // Build update object
  const updateFields = {};
  if (name) updateFields.name = name;
  if (grade) updateFields.grade = grade;
  if (enrollmentDate) updateFields.enrollmentDate = enrollmentDate;
  if (status) updateFields.status = status;

  // Update parents if provided
  if (parentEmails && parentEmails.length > 0) {
    const parents = await User.find({ 
      email: { $in: parentEmails },
      role: 'parent'
    });

    if (parents.length !== parentEmails.length) {
      return res.status(400).json({ 
        success: false, 
        message: 'One or more parent emails are invalid or not registered as parents' 
      });
    }

    updateFields.parents = parents.map(parent => parent._id);
  }

  student = await Student.findByIdAndUpdate(
    req.params.id,
    updateFields,
    { new: true, runValidators: true }
  ).populate('parents', 'name email');

  res.status(200).json({
    success: true,
    data: student
  });
});

// @desc    Delete student
// @route   DELETE /api/students/:id
// @access  Private/Admin
export const deleteStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    return res.status(404).json({ success: false, message: 'Student not found' });
  }

  await student.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get enrollment statistics
// @route   GET /api/students/stats/enrollment
// @access  Private/Admin
export const getEnrollmentStats = asyncHandler(async (req, res) => {
  // Get total students
  const totalStudents = await Student.countDocuments({ status: 'active' });

  // Get students by grade
  const gradeStats = await Student.aggregate([
    { $match: { status: 'active' } },
    { $group: { _id: '$grade', count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  ]);

  // Define grade capacities (hardcoded for demo)
  const gradeCapacities = {
    'Grade 1': 120,
    'Grade 2': 120,
    'Grade 3': 120,
    'Grade 4': 150,
    'Grade 5': 150,
    'Grade 6': 150,
    'Grade 7': 150,
    'Grade 8': 150,
    'Grade 9': 150,
    'Grade 10': 80,
    'Grade 11': 80,
    'Grade 12': 80
  };

  // Format the response
  const byGrade = {};
  gradeStats.forEach(grade => {
    byGrade[grade._id] = {
      current: grade.count,
      capacity: gradeCapacities[grade._id] || 100
    };
  });

  // Add missing grades with zero counts
  Object.keys(gradeCapacities).forEach(grade => {
    if (!byGrade[grade]) {
      byGrade[grade] = {
        current: 0,
        capacity: gradeCapacities[grade]
      };
    }
  });

  res.status(200).json({
    success: true,
    data: {
      totalStudents,
      maxCapacity: 1500, // Hardcoded for demo
      byGrade
    }
  });
});
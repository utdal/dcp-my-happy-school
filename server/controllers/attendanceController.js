import Attendance from '../models/Attendance.js';
import Student from '../models/Student.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Get all attendance records
// @route   GET /api/attendance
// @access  Private
export const getAttendanceRecords = asyncHandler(async (req, res) => {
  const { studentId, date, status } = req.query;
  let query = {};

  // Filter by student if provided
  if (studentId) {
    query.student = studentId;
  }

  // Filter by date if provided
  if (date) {
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);
    
    query.date = { $gte: startDate, $lte: endDate };
  }

  // Filter by status if provided
  if (status) {
    query.status = status;
  }

  // If user is parent, only show attendance for their children
  if (req.user.role === 'parent') {
    // Get all students associated with this parent
    const students = await Student.find({ parents: req.user._id });
    const studentIds = students.map(student => student._id);
    
    // Add to query
    query.student = { $in: studentIds };
  }

  const attendanceRecords = await Attendance.find(query)
    .populate('student', 'name grade')
    .populate('recordedBy', 'name')
    .sort({ date: -1 });

  res.status(200).json({
    success: true,
    count: attendanceRecords.length,
    data: attendanceRecords
  });
});

// @desc    Get single attendance record
// @route   GET /api/attendance/:id
// @access  Private
export const getAttendanceRecord = asyncHandler(async (req, res) => {
  const attendance = await Attendance.findById(req.params.id)
    .populate('student', 'name grade')
    .populate('recordedBy', 'name');

  if (!attendance) {
    return res.status(404).json({ success: false, message: 'Attendance record not found' });
  }

  // Check if user has access to this attendance record
  if (req.user.role === 'parent') {
    const student = await Student.findById(attendance.student);
    if (!student.parents.includes(req.user._id)) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to access this attendance record' 
      });
    }
  }

  res.status(200).json({
    success: true,
    data: attendance
  });
});

// @desc    Create new attendance record
// @route   POST /api/attendance
// @access  Private/Teacher,Admin
export const createAttendanceRecord = asyncHandler(async (req, res) => {
  // Add recordedBy to req.body
  req.body.recordedBy = req.user.id;

  // Check if student exists
  const student = await Student.findById(req.body.student);
  if (!student) {
    return res.status(404).json({ success: false, message: 'Student not found' });
  }

  // Check if attendance record already exists for this student on this date
  const existingRecord = await Attendance.findOne({
    student: req.body.student,
    date: new Date(req.body.date)
  });

  if (existingRecord) {
    return res.status(400).json({ 
      success: false, 
      message: 'Attendance record already exists for this student on this date' 
    });
  }

  const attendance = await Attendance.create(req.body);

  res.status(201).json({
    success: true,
    data: attendance
  });
});

// @desc    Update attendance record
// @route   PUT /api/attendance/:id
// @access  Private/Teacher,Admin
export const updateAttendanceRecord = asyncHandler(async (req, res) => {
  let attendance = await Attendance.findById(req.params.id);

  if (!attendance) {
    return res.status(404).json({ success: false, message: 'Attendance record not found' });
  }

  attendance = await Attendance.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: attendance
  });
});

// @desc    Delete attendance record
// @route   DELETE /api/attendance/:id
// @access  Private/Teacher,Admin
export const deleteAttendanceRecord = asyncHandler(async (req, res) => {
  const attendance = await Attendance.findById(req.params.id);

  if (!attendance) {
    return res.status(404).json({ success: false, message: 'Attendance record not found' });
  }

  await attendance.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get attendance statistics
// @route   GET /api/attendance/stats
// @access  Private/Teacher,Admin
export const getAttendanceStats = asyncHandler(async (req, res) => {
  const { grade, startDate, endDate } = req.query;
  let query = {};

  // Filter by date range if provided
  if (startDate && endDate) {
    query.date = { 
      $gte: new Date(startDate), 
      $lte: new Date(endDate) 
    };
  }

  // Filter by grade if provided
  if (grade) {
    // First get all students in this grade
    const students = await Student.find({ grade });
    const studentIds = students.map(student => student._id);
    
    // Add to query
    query.student = { $in: studentIds };
  }

  // Get attendance by status
  const statusStats = await Attendance.aggregate([
    { $match: query },
    { $group: { 
      _id: '$status', 
      count: { $sum: 1 }
    }}
  ]);

  // Get attendance by date
  const dateStats = await Attendance.aggregate([
    { $match: query },
    { $group: { 
      _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
      present: { 
        $sum: { $cond: [{ $eq: ['$status', 'present'] }, 1, 0] }
      },
      absent: { 
        $sum: { $cond: [{ $eq: ['$status', 'absent'] }, 1, 0] }
      },
      late: { 
        $sum: { $cond: [{ $eq: ['$status', 'late'] }, 1, 0] }
      },
      excused: { 
        $sum: { $cond: [{ $eq: ['$status', 'excused'] }, 1, 0] }
      },
      total: { $sum: 1 }
    }},
    { $sort: { _id: 1 } }
  ]);

  // Calculate overall attendance rate
  const totalRecords = statusStats.reduce((acc, curr) => acc + curr.count, 0);
  const presentCount = statusStats.find(s => s._id === 'present')?.count || 0;
  const attendanceRate = totalRecords > 0 ? (presentCount / totalRecords) * 100 : 0;

  res.status(200).json({
    success: true,
    data: {
      statusStats,
      dateStats,
      attendanceRate: attendanceRate.toFixed(1)
    }
  });
});
import Announcement from '../models/Announcement.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Get all announcements
// @route   GET /api/announcements
// @access  Private
export const getAnnouncements = asyncHandler(async (req, res) => {
  const { priority, search } = req.query;
  const query = {};

  // Filter by priority if provided
  if (priority && priority !== 'all') {
    query.priority = priority;
  }

  // Filter by role - staff announcements are only for teachers and admins
  if (req.user.role === 'parent') {
    query.priority = { $ne: 'staff' };
  }

  // Search in title or content
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
      { audience: { $regex: search, $options: 'i' } }
    ];
  }

  const announcements = await Announcement.find(query)
    .populate('author', 'name')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: announcements.length,
    data: announcements
  });
});

// @desc    Get single announcement
// @route   GET /api/announcements/:id
// @access  Private
export const getAnnouncement = asyncHandler(async (req, res) => {
  const announcement = await Announcement.findById(req.params.id)
    .populate('author', 'name');

  if (!announcement) {
    return res.status(404).json({ success: false, message: 'Announcement not found' });
  }

  // Check if parent is trying to access staff announcement
  if (req.user.role === 'parent' && announcement.priority === 'staff') {
    return res.status(403).json({ 
      success: false, 
      message: 'Not authorized to access this announcement' 
    });
  }

  res.status(200).json({
    success: true,
    data: announcement
  });
});

// @desc    Create new announcement
// @route   POST /api/announcements
// @access  Private/Admin
export const createAnnouncement = asyncHandler(async (req, res) => {
  // Add user to req.body
  req.body.author = req.user.id;

  const announcement = await Announcement.create(req.body);

  res.status(201).json({
    success: true,
    data: announcement
  });
});

// @desc    Update announcement
// @route   PUT /api/announcements/:id
// @access  Private/Admin
export const updateAnnouncement = asyncHandler(async (req, res) => {
  let announcement = await Announcement.findById(req.params.id);

  if (!announcement) {
    return res.status(404).json({ success: false, message: 'Announcement not found' });
  }

  // Make sure user is announcement author or admin
  if (announcement.author.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(401).json({ 
      success: false, 
      message: 'Not authorized to update this announcement' 
    });
  }

  announcement = await Announcement.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: announcement
  });
});

// @desc    Delete announcement
// @route   DELETE /api/announcements/:id
// @access  Private/Admin
export const deleteAnnouncement = asyncHandler(async (req, res) => {
  const announcement = await Announcement.findById(req.params.id);

  if (!announcement) {
    return res.status(404).json({ success: false, message: 'Announcement not found' });
  }

  // Make sure user is announcement author or admin
  if (announcement.author.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(401).json({ 
      success: false, 
      message: 'Not authorized to delete this announcement' 
    });
  }

  await announcement.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});
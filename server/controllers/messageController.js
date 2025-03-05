import Message from '../models/Message.js';
import User from '../models/User.js';
import Student from '../models/Student.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private
export const getMessages = asyncHandler(async (req, res) => {
  const { folder, search } = req.query;
  let query = {};

  // Filter by folder (inbox or sent)
  if (folder === 'inbox') {
    query.to = req.user._id;
  } else if (folder === 'sent') {
    query.from = req.user._id;
  } else {
    // Default to inbox
    query.to = req.user._id;
  }

  // Search in subject or content
  if (search) {
    query.$or = [
      { subject: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } }
    ];
  }

  const messages = await Message.find(query)
    .populate('from', 'name role')
    .populate('to', 'name role')
    .populate('regarding', 'name grade')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: messages.length,
    data: messages
  });
});

// @desc    Get single message
// @route   GET /api/messages/:id
// @access  Private
export const getMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id)
    .populate('from', 'name role')
    .populate('to', 'name role')
    .populate('regarding', 'name grade');

  if (!message) {
    return res.status(404).json({ success: false, message: 'Message not found' });
  }

  // Make sure user is the sender or recipient
  if (message.from.toString() !== req.user.id && message.to.toString() !== req.user.id) {
    return res.status(403).json({ 
      success: false, 
      message: 'Not authorized to access this message' 
    });
  }

  // If user is recipient and message is unread, mark as read
  if (message.to.toString() === req.user.id && !message.read) {
    message.read = true;
    await message.save();
  }

  res.status(200).json({
    success: true,
    data: message
  });
});

// @desc    Create new message
// @route   POST /api/messages
// @access  Private
export const createMessage = asyncHandler(async (req, res) => {
  const { to, subject, content, regarding } = req.body;

  // Add sender to req.body
  req.body.from = req.user.id;

  // Check if recipient exists
  const recipient = await User.findById(to);
  if (!recipient) {
    return res.status(404).json({ success: false, message: 'Recipient not found' });
  }

  // If regarding a student, check if student exists
  if (regarding) {
    const student = await Student.findById(regarding);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    // If sender is parent, make sure they are parent of this student
    if (req.user.role === 'parent') {
      if (!student.parents.includes(req.user._id)) {
        return res.status(403).json({ 
          success: false, 
          message: 'Not authorized to send messages regarding this student' 
        });
      }
    }
  }

  const message = await Message.create({
    from: req.user.id,
    to,
    subject,
    content,
    regarding
  });

  res.status(201).json({
    success: true,
    data: message
  });
});

// @desc    Update message (mark as read/starred)
// @route   PUT /api/messages/:id
// @access  Private
export const updateMessage = asyncHandler(async (req, res) => {
  const { read, starred } = req.body;
  
  let message = await Message.findById(req.params.id);

  if (!message) {
    return res.status(404).json({ success: false, message: 'Message not found' });
  }

  // Make sure user is the recipient
  if (message.to.toString() !== req.user.id) {
    return res.status(403).json({ 
      success: false, 
      message: 'Not authorized to update this message' 
    });
  }

  // Build update object
  const updateFields = {};
  if (read !== undefined) updateFields.read = read;
  if (starred !== undefined) updateFields.starred = starred;

  message = await Message.findByIdAndUpdate(
    req.params.id,
    updateFields,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    data: message
  });
});

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private
export const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (!message) {
    return res.status(404).json({ success: false, message: 'Message not found' });
  }

  // Make sure user is the sender or recipient
  if (message.from.toString() !== req.user.id && message.to.toString() !== req.user.id) {
    return res.status(403).json({ 
      success: false, 
      message: 'Not authorized to delete this message' 
    });
  }

  await message.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get unread message count
// @route   GET /api/messages/unread
// @access  Private
export const getUnreadCount = asyncHandler(async (req, res) => {
  const count = await Message.countDocuments({
    to: req.user._id,
    read: false
  });

  res.status(200).json({
    success: true,
    data: { count }
  });
});
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/myhappyschool", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Define Mongoose Schemas
const ParentSchema = new mongoose.Schema({
    parent_id: String,
    name: String,
    email: String,
    phone: String,
    password: String,
    approved: { type: Boolean, default: false },
    students: [{ student_id: String, name: String, grade: String }]
});

const StudentSchema = new mongoose.Schema({
    student_id: String,
    name: String,
    grade: String,
    attendance: { present_days: Number, total_days: Number },
    grades: { math: Number, science: Number, english: Number }
});

const AnnouncementSchema = new mongoose.Schema({
    title: String,
    message: String,
    postedBy: String,
    createdAt: { type: Date, default: Date.now }
});

// Create Models
const Parent = mongoose.model("Parent", ParentSchema);
const Student = mongoose.model("Student", StudentSchema);
const Announcement = mongoose.model("Announcement", AnnouncementSchema);

// Secret Key for JWT
const SECRET_KEY = "mysecretkey";

// Middleware for Authentication
const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        const verified = jwt.verify(token, SECRET_KEY);
        req.parent = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

// --- API Routes ---

// **1. Parent Registration (Requires Admin Approval)**
app.post("/parents/register", async (req, res) => {
    const { parent_id, name, email, phone, password, students } = req.body;

    const existingParent = await Parent.findOne({ email });
    if (existingParent) return res.status(400).json({ message: "Parent already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newParent = new Parent({ parent_id, name, email, phone, password: hashedPassword, students });

    await newParent.save();
    res.status(201).json({ message: "Registration request sent. Waiting for admin approval." });
});

// **2. Parent Login**
app.post("/parents/login", async (req, res) => {
    const { email, password } = req.body;

    const parent = await Parent.findOne({ email });
    if (!parent) return res.status(400).json({ message: "Parent not found" });
    if (!parent.approved) return res.status(403).json({ message: "Account not approved by admin" });

    const validPassword = await bcrypt.compare(password, parent.password);
    if (!validPassword) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: parent._id, email: parent.email }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
});

// **3. Reset Password**
app.post("/parents/reset-password", async (req, res) => {
    const { email, newPassword } = req.body;

    const parent = await Parent.findOne({ email });
    if (!parent) return res.status(400).json({ message: "Parent not found" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    parent.password = hashedPassword;
    await parent.save();

    res.json({ message: "Password updated successfully" });
});

// **4. View Parent Profile**
app.get("/parents/profile", authMiddleware, async (req, res) => {
    const parent = await Parent.findById(req.parent.id).select("-password");
    res.json(parent);
});

// **5. Update Parent Profile**
app.put("/parents/update", authMiddleware, async (req, res) => {
    const { name, phone } = req.body;

    await Parent.findByIdAndUpdate(req.parent.id, { name, phone });
    res.json({ message: "Profile updated successfully" });
});

// **6. View Student Enrollment Details**
app.get("/students/:student_id", authMiddleware, async (req, res) => {
    const student = await Student.findOne({ student_id: req.params.student_id });
    if (!student) return res.status(404).json({ message: "Student not found" });

    res.json(student);
});

// **7. Track Student Grades**
app.get("/students/:student_id/grades", authMiddleware, async (req, res) => {
    const student = await Student.findOne({ student_id: req.params.student_id });
    if (!student) return res.status(404).json({ message: "Student not found" });

    res.json({ grades: student.grades });
});

// **8. Monitor Student Attendance**
app.get("/students/:student_id/attendance", authMiddleware, async (req, res) => {
    const student = await Student.findOne({ student_id: req.params.student_id });
    if (!student) return res.status(404).json({ message: "Student not found" });

    res.json({ attendance: student.attendance });
});

// **9. Download Student Report Card (Mock Implementation)**
app.get("/students/:student_id/report-card", authMiddleware, async (req, res) => {
    res.json({ message: "Report card downloaded successfully" });
});

// **10. Receive Announcements**
app.get("/announcements", authMiddleware, async (req, res) => {
    const announcements = await Announcement.find();
    res.json(announcements);
});

// **11. Access Learning Materials (Mock Implementation)**
app.get("/learning-materials", authMiddleware, async (req, res) => {
    res.json({ message: "No learning materials available at the moment" });
});

// **12. Parent-Teacher Messaging (Mock Implementation)**
app.post("/messages", authMiddleware, async (req, res) => {
    res.json({ message: "Message sent successfully" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

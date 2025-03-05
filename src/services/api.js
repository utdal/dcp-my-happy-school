/**
 * API service for making requests to the backend
 */

// Base URL for API requests
const API_URL = 'http://localhost:5000/api';

// Helper function to handle fetch responses
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    const error = data.message || response.statusText;
    return Promise.reject(error);
  }
  
  return data;
};

// Get auth token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Set auth token in localStorage
const setToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

// API request function with auth header
const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    credentials: 'include'
  };
  
  const requestOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers
    }
  };
  
  try {
    const response = await fetch(`${API_URL}${endpoint}`, requestOptions);
    return handleResponse(response);
  } catch (error) {
    return Promise.reject(error.message || 'Something went wrong');
  }
};

// Auth API
export const authAPI = {
  register: (userData) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    }).then(data => {
      if (data.token) {
        setToken(data.token);
      }
      return data;
    });
  },
  
  login: (credentials) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    }).then(data => {
      if (data.token) {
        setToken(data.token);
      }
      return data;
    });
  },
  
  logout: () => {
    return apiRequest('/auth/logout').then(() => {
      setToken(null);
    });
  },
  
  getCurrentUser: () => {
    return apiRequest('/auth/me');
  }
};

// Users API
export const usersAPI = {
  getUsers: (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    return apiRequest(`/users?${queryParams}`);
  },
  
  getUser: (id) => {
    return apiRequest(`/users/${id}`);
  },
  
  createUser: (userData) => {
    return apiRequest('/users', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },
  
  updateUser: (id, userData) => {
    return apiRequest(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData)
    });
  },
  
  deleteUser: (id) => {
    return apiRequest(`/users/${id}`, {
      method: 'DELETE'
    });
  },
  
  updateUserStatus: (id, status) => {
    return apiRequest(`/users/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
  }
};

// Announcements API
export const announcementsAPI = {
  getAnnouncements: (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    return apiRequest(`/announcements?${queryParams}`);
  },
  
  getAnnouncement: (id) => {
    return apiRequest(`/announcements/${id}`);
  },
  
  createAnnouncement: (announcementData) => {
    return apiRequest('/announcements', {
      method: 'POST',
      body: JSON.stringify(announcementData)
    });
  },
  
  updateAnnouncement: (id, announcementData) => {
    return apiRequest(`/announcements/${id}`, {
      method: 'PUT',
      body: JSON.stringify(announcementData)
    });
  },
  
  deleteAnnouncement: (id) => {
    return apiRequest(`/announcements/${id}`, {
      method: 'DELETE'
    });
  }
};

// Students API
export const studentsAPI = {
  getStudents: (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    return apiRequest(`/students?${queryParams}`);
  },
  
  getStudent: (id) => {
    return apiRequest(`/students/${id}`);
  },
  
  createStudent: (studentData) => {
    return apiRequest('/students', {
      method: 'POST',
      body: JSON.stringify(studentData)
    });
  },
  
  updateStudent: (id, studentData) => {
    return apiRequest(`/students/${id}`, {
      method: 'PUT',
      body: JSON.stringify(studentData)
    });
  },
  
  deleteStudent: (id) => {
    return apiRequest(`/students/${id}`, {
      method: 'DELETE'
    });
  },
  
  getEnrollmentStats: () => {
    return apiRequest('/students/stats/enrollment');
  }
};

// Grades API
export const gradesAPI = {
  getGrades: (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    return apiRequest(`/grades?${queryParams}`);
  },
  
  getGrade: (id) => {
    return apiRequest(`/grades/${id}`);
  },
  
  createGrade: (gradeData) => {
    return apiRequest('/grades', {
      method: 'POST',
      body: JSON.stringify(gradeData)
    });
  },
  
  updateGrade: (id, gradeData) => {
    return apiRequest(`/grades/${id}`, {
      method: 'PUT',
      body: JSON.stringify(gradeData)
    });
  },
  
  deleteGrade: (id) => {
    return apiRequest(`/grades/${id}`, {
      method: 'DELETE'
    });
  },
  
  getGradeStats: (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    return apiRequest(`/grades/stats?${queryParams}`);
  }
};

// Attendance API
export const attendanceAPI = {
  getAttendanceRecords: (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    return apiRequest(`/attendance?${queryParams}`);
  },
  
  getAttendanceRecord: (id) => {
    return apiRequest(`/attendance/${id}`);
  },
  
  createAttendanceRecord: (attendanceData) => {
    return apiRequest('/attendance', {
      method: 'POST',
      body: JSON.stringify(attendanceData)
    });
  },
  
  updateAttendanceRecord: (id, attendanceData) => {
    return apiRequest(`/attendance/${id}`, {
      method: 'PUT',
      body: JSON.stringify(attendanceData)
    });
  },
  
  deleteAttendanceRecord: (id) => {
    return apiRequest(`/attendance/${id}`, {
      method: 'DELETE'
    });
  },
  
  getAttendanceStats: (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    return apiRequest(`/attendance/stats?${queryParams}`);
  }
};

// Messages API
export const messagesAPI = {
  getMessages: (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    return apiRequest(`/messages?${queryParams}`);
  },
  
  getMessage: (id) => {
    return apiRequest(`/messages/${id}`);
  },
  
  createMessage: (messageData) => {
    return apiRequest('/messages', {
      method: 'POST',
      body: JSON.stringify(messageData)
    });
  },
  
  updateMessage: (id, messageData) => {
    return apiRequest(`/messages/${id}`, {
      method: 'PUT',
      body: JSON.stringify(messageData)
    });
  },
  
  deleteMessage: (id) => {
    return apiRequest(`/messages/${id}`, {
      method: 'DELETE'
    });
  },
  
  getUnreadCount: () => {
    return apiRequest('/messages/unread');
  }
};
// auth.js - Authentication functionality

// Mock admin users
const adminUsers = [
    {
      id: "admin-123",
      name: "Admin User",
      email: "admin@example.gov",
      password: "password123",
      role: "admin",
      department: "public-works",
      employeeId: "GOV-12345",
    },
  ];
  
  // Register a new admin
  function registerAdmin() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const department = document.getElementById('department').value;
    const employeeId = document.getElementById('employeeId').value;
    const accessCode = document.getElementById('accessCode').value;
    
    // Validate access code
    if (accessCode !== "ADMIN123") {
      showAlert("Invalid access code", "danger");
      return;
    }
    
    // Check if email already exists
    const existingUser = adminUsers.find(user => user.email === email);
    if (existingUser) {
      showAlert("Email already registered", "danger");
      return;
    }
    
    // Create new admin user
    const newAdmin = {
      id: `admin-${Date.now()}`,
      name,
      email,
      password,
      role: "admin",
      department,
      employeeId,
    };
    
    // Add to mock database (in a real app, this would be a server call)
    adminUsers.push(newAdmin);
    
    // Store in localStorage for demo purposes
    const storedUsers = JSON.parse(localStorage.getItem('adminUsers') || '[]');
    storedUsers.push(newAdmin);
    localStorage.setItem('adminUsers', JSON.stringify(storedUsers));
    
    showAlert("Registration successful. You can now log in.", "success");
    
    // Redirect to login page after a delay
    setTimeout(() => {
      window.location.href = "admin-login.html";
    }, 2000);
  }
  
  // Login admin
  function loginAdmin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Get users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('adminUsers') || '[]');
    const allUsers = [...adminUsers, ...storedUsers];
    
    // Find user
    const user = allUsers.find(u => u.email === email && u.password === password);
    
    if (!user || user.role !== "admin") {
      showAlert("Invalid credentials", "danger");
      return;
    }
    
    // Set user in session
    const sessionUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
    };
    
    localStorage.setItem('currentUser', JSON.stringify(sessionUser));
    
    showAlert("Login successful", "success");
    
    // Redirect to dashboard after a delay
    setTimeout(() => {
      window.location.href = "admin-dashboard.html";
    }, 1000);
  }
  
  // Logout
  function logout() {
    localStorage.removeItem('currentUser');
    showAlert("Logged out successfully", "success");
    
    // Redirect to login page after a delay
    setTimeout(() => {
      window.location.href = "admin-login.html";
    }, 1000);
  }
  
  // Check if user is authenticated as admin
  function checkAdminAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser || currentUser.role !== "admin") {
      showAlert("You must be logged in as an admin to view this page", "danger");
      
      // Redirect to login page after a delay
      setTimeout(() => {
        window.location.href = "admin-login.html";
      }, 1000);
      
      return false;
    }
    
    // Update user info in header
    updateUserInfo(currentUser);
    
    return true;
  }
  
  // Update user info in header
  function updateUserInfo(user) {
    const userNameElement = document.getElementById('userName');
    const userDepartmentElement = document.getElementById('userDepartment');
    const userAvatarElement = document.getElementById('userAvatar');
    
    if (userNameElement) {
      userNameElement.textContent = user.name;
    }
    
    if (userDepartmentElement) {
      userDepartmentElement.textContent = user.department;
    }
    
    if (userAvatarElement) {
      userAvatarElement.textContent = user.name.charAt(0);
    }
  }
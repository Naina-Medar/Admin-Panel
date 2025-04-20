// dashboard.js - Dashboard functionality

// Mock data for the dashboard
const reportsByDepartment = [
    { name: "Public Works", value: 45 },
    { name: "Health", value: 28 },
    { name: "Education", value: 15 },
    { name: "Transportation", value: 32 },
    { name: "Utilities", value: 22 },
    { name: "Housing", value: 18 },
  ];
  
  const reportsByStatus = [
    { name: "Pending", value: 35, color: "#f59e0b" },
    { name: "In Progress", value: 45, color: "#3b82f6" },
    { name: "Resolved", value: 80, color: "#10b981" },
    { name: "Rejected", value: 15, color: "#ef4444" },
  ];
  
  const weeklyReports = [
    { day: "Mon", count: 12 },
    { day: "Tue", count: 18 },
    { day: "Wed", count: 15 },
    { day: "Thu", count: 22 },
    { day: "Fri", count: 25 },
    { day: "Sat", count: 10 },
    { day: "Sun", count: 8 },
  ];
  
  // Load dashboard data
  function loadDashboardData() {
    // Update last updated date
    document.getElementById('lastUpdated').textContent = `Last updated: ${new Date().toLocaleDateString()}`;
    
    // Load reports from localStorage or use mock data
    const reports = JSON.parse(localStorage.getItem('reports') || '[]');
    const allReports = [...mockReports, ...reports];
    
    // Calculate statistics
    const totalReports = allReports.length;
    const pendingReports = allReports.filter(r => r.status === "Pending").length;
    const inProgressReports = allReports.filter(r => r.status === "In Progress").length;
    const resolvedReports = allReports.filter(r => r.status === "Resolved").length;
    
    // Update statistics
    document.getElementById('totalReports').textContent = totalReports;
    document.getElementById('pendingReports').textContent = pendingReports;
    document.getElementById('inProgressReports').textContent = inProgressReports;
    document.getElementById('resolvedReports').textContent = resolvedReports;
    
    // Load recent reports
    loadRecentReports(allReports.slice(0, 5));
    
    // Initialize charts
    initializeCharts(pendingReports, inProgressReports, resolvedReports);
  }
  
  // Load recent reports
  function loadRecentReports(reports) {
    const recentReportsTable = document.getElementById('recentReportsTable');
    
    if (!recentReportsTable) return;
    
    let html = '';
    
    reports.forEach(report => {
      html += `
        <tr>
          <td>${report.id}</td>
          <td>${report.title}</td>
          <td>${report.department}</td>
          <td>
            <span class="badge ${report.status === 'Resolved' ? 'bg-success' : report.status === 'Pending' ? 'bg-warning' : 'bg-info'}">
              ${report.status}
            </span>
          </td>
          <td>${report.date}</td>
          <td>
            <span class="badge ${report.priority === 'High' ? 'bg-danger' : report.priority === 'Medium' ? 'bg-warning' : 'bg-success'}">
              ${report.priority}
            </span>
          </td>
        </tr>
      `;
    });
    
    recentReportsTable.innerHTML = html;
  }
  
  // Initialize charts
  function initializeCharts(pendingReports, inProgressReports, resolvedReports) {
    // Department Chart
    const departmentCtx = document.getElementById('departmentChart').getContext('2d');
    new Chart(departmentCtx, {
      type: 'bar',
      data: {
        labels: reportsByDepartment.map(d => d.name),
        datasets: [{
          label: 'Number of Reports',
          data: reportsByDepartment.map(d => d.value),
          backgroundColor: '#3b82f6',
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    });
  
    // Status Chart
    const statusCtx = document.getElementById('statusChart').getContext('2d');
    new Chart(statusCtx, {
      type: 'pie',
      data: {
        labels: reportsByStatus.map(s => s.name),
        datasets: [{
          data: [pendingReports, inProgressReports, resolvedReports, 15],
          backgroundColor: reportsByStatus.map(s => s.color),
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    });
  
    // Weekly Chart
    const weeklyCtx = document.getElementById('weeklyChart').getContext('2d');
    new Chart(weeklyCtx, {
      type: 'bar',
      data: {
        labels: weeklyReports.map(w => w.day),
        datasets: [{
          label: 'Reports Submitted',
          data: weeklyReports.map(w => w.count),
          backgroundColor: '#3b82f6',
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    });
  }
  
  // Mock reports data
  const mockReports = [
    {
      id: "REP-1234",
      title: "Pothole on Main Street",
      department: "Public Works",
      status: "In Progress",
      date: "2023-04-15",
      priority: "High",
      assignedTo: "John Smith",
      location: "123 Main St",
      description: "Large pothole causing traffic hazards",
    },
    {
      id: "REP-1235",
      title: "Streetlight outage",
      department: "Utilities",
      status: "Pending",
      date: "2023-04-14",
      priority: "Medium",
      assignedTo: "Unassigned",
      location: "456 Oak Ave",
      description: "Three consecutive streetlights not working",
    },
    {
      id: "REP-1236",
      title: "Garbage collection missed",
      department: "Public Works",
      status: "Resolved",
      date: "2023-04-12",
      priority: "Low",
      assignedTo: "Sarah Johnson",
      location: "789 Pine St",
      description: "Garbage not collected for two weeks",
    },
    {
      id: "REP-1237",
      title: "Water quality concern",
      department: "Health",
      status: "In Progress",
      date: "2023-04-10",
      priority: "High",
      assignedTo: "Michael Brown",
      location: "321 Elm St",
      description: "Discolored water coming from taps",
    },
    {
      id: "REP-1238",
      title: "Playground equipment damaged",
      department: "Parks",
      status: "Pending",
      date: "2023-04-09",
      priority: "Medium",
      assignedTo: "Unassigned",
      location: "City Park",
      description: "Swing set broken and potentially dangerous",
    },
    {
      id: "REP-1239",
      title: "Traffic light malfunction",
      department: "Transportation",
      status: "In Progress",
      date: "2023-04-08",
      priority: "High",
      assignedTo: "David Wilson",
      location: "Main St & 5th Ave",
      description: "Traffic light stuck on red in all directions",
    },
    {
      id: "REP-1240",
      title: "Graffiti on public building",
      department: "Public Works",
      status: "Resolved",
      date: "2023-04-07",
      priority: "Low",
      assignedTo: "Emily Davis",
      location: "City Hall",
      description: "Graffiti on the east wall of city hall",
    },
  ];
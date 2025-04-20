// reports.js - Reports functionality

// Load reports data
function loadReportsData() {
    // Get filter values from URL
    const params = getUrlParams();
    
    // Set filter values
    if (params.status) {
      document.getElementById('statusFilter').value = params.status;
    }
    
    if (params.department) {
      document.getElementById('departmentFilter').value = params.department;
    }
    
    if (params.priority) {
      document.getElementById('priorityFilter').value = params.priority;
    }
    
    if (params.search) {
      document.getElementById('tableSearch').value = params.search;
    }
    
    // Load reports from localStorage or use mock data
    const reports = JSON.parse(localStorage.getItem('reports') || '[]');
    const allReports = [...mockReports, ...reports];
    
    // Filter reports
    let filteredReports = [...allReports];
    
    if (params.status && params.status !== 'all') {
      filteredReports = filteredReports.filter(r => r.status === params.status);
    }
    
    if (params.department && params.department !== 'all') {
      filteredReports = filteredReports.filter(r => r.department === params.department);
    }
    
    if (params.priority && params.priority !== 'all') {
      filteredReports = filteredReports.filter(r => r.priority === params.priority);
    }
    
    if (params.search) {
      const searchTerm = params.search.toLowerCase();
      filteredReports = filteredReports.filter(r => 
        r.title.toLowerCase().includes(searchTerm) || 
        r.id.toLowerCase().includes(searchTerm) || 
        r.description.toLowerCase().includes(searchTerm)
      );
    }
    
    // Display reports
    displayReports(filteredReports);
  }
  
  // Display reports in table
  function displayReports(reports) {
    const reportsTable = document.getElementById('reportsTable');
    const reportCount = document.getElementById('reportCount');
    
    if (!reportsTable) return;
    
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
          <td>
            <span class="badge ${report.priority === 'High' ? 'bg-danger' : report.priority === 'Medium' ? 'bg-warning' : 'bg-success'}">
              ${report.priority}
            </span>
          </td>
          <td>${report.date}</td>
          <td>${report.assignedTo}</td>
          <td class="text-end">
            <div class="dropdown">
              <button class="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                Actions
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item" href="admin-report-detail.html?id=${report.id}">View Details</a></li>
                <li><a class="dropdown-item" href="#">Assign</a></li>
                <li><a class="dropdown-item" href="#">Update Status</a></li>
                <li><a class="dropdown-item" href="#">Add Comment</a></li>
              </ul>
            </div>
          </td>
        </tr>
      `;
    });
    
    reportsTable.innerHTML = html;
    
    if (reportCount) {
      reportCount.textContent = `Showing ${reports.length} of ${mockReports.length} reports`;
    }
  }
  
  // Filter reports
  function filterReports() {
    const status = document.getElementById('statusFilter').value;
    const department = document.getElementById('departmentFilter').value;
    const priority = document.getElementById('priorityFilter').value;
    const search = document.getElementById('tableSearch').value;
    
    // Build URL with filters
    let url = 'admin-reports.html?';
    
    if (status !== 'all') {
      url += `status=${status}&`;
    }
    
    if (department !== 'all') {
      url += `department=${department}&`;
    }
    
    if (priority !== 'all') {
      url += `priority=${priority}&`;
    }
    
    if (search) {
      url += `search=${search}&`;
    }
    
    // Remove trailing &
    url = url.endsWith('&') ? url.slice(0, -1) : url;
    
    // Redirect to filtered URL
    window.location.href = url;
  }
  
  // Export reports to CSV
  function exportReports() {
    // Get filtered reports
    const params = getUrlParams();
    
    // Load reports from localStorage or use mock data
    const reports = JSON.parse(localStorage.getItem('reports') || '[]');
    const allReports = [...mockReports, ...reports];
    
    // Filter reports
    let filteredReports = [...allReports];
    
    if (params.status && params.status !== 'all') {
      filteredReports = filteredReports.filter(r => r.status === params.status);
    }
    
    if (params.department && params.department !== 'all') {
      filteredReports = filteredReports.filter(r => r.department === params.department);
    }
    
    if (params.priority && params.priority !== 'all') {
      filteredReports = filteredReports.filter(r => r.priority === params.priority);
    }
    
    if (params.search) {
      const searchTerm = params.search.toLowerCase();
      filteredReports = filteredReports.filter(r => 
        r.title.toLowerCase().includes(searchTerm) || 
        r.id.toLowerCase().includes(searchTerm) || 
        r.description.toLowerCase().includes(searchTerm)
      );
    }
    
    // Export to CSV
    exportToCSV(filteredReports, 'reports.csv');
    
    showAlert('Reports exported successfully', 'success');
  }
  
  // Load report details
  function loadReportDetails(reportId) {
    // Load reports from localStorage or use mock data
    const reports = JSON.parse(localStorage.getItem('reports') || '[]');
    const allReports = [...mockReports, ...reports];
    
    // Find report
    const report = allReports.find(r => r.id === reportId);
    
    if (!report) {
      showAlert('Report not found', 'danger');
      setTimeout(() => {
        window.location.href = 'admin-reports.html';
      }, 2000);
      return;
    }
    
    // Add additional details for demo
    const reportDetail = {
      ...report,
      submittedBy: {
        name: "Jane Citizen",
        email: "jane@example.com",
        phone: "555-123-4567",
      },
      timeline: [
        {
          date: "2023-04-15 09:30 AM",
          action: "Report submitted",
          user: "Jane Citizen",
          notes: "Initial submission",
        },
        {
          date: "2023-04-15 10:15 AM",
          action: "Report reviewed",
          user: "Admin User",
          notes: "Verified report details",
        },
        {
          date: "2023-04-15 11:00 AM",
          action: "Assigned to department",
          user: "Admin User",
          notes: "Assigned to Public Works",
        },
        {
          date: "2023-04-16 08:45 AM",
          action: "Status updated",
          user: "John Smith",
          notes: "Changed status to In Progress",
        },
      ],
      comments: [
        {
          id: 1,
          user: "Admin User",
          date: "2023-04-15 10:15 AM",
          text: "Report verified. This is indeed a significant pothole that requires immediate attention.",
        },
        {
          id: 2,
          user: "John Smith",
          date: "2023-04-16 09:30 AM",
          text: "I've inspected the site. We'll need to close one lane for repairs. Scheduled for tomorrow morning.",
        },
        {
          id: 3,
          user: "Jane Citizen",
          date: "2023-04-16 02:15 PM",
          text: "Thank you for the quick response. The pothole seems to be getting worse with today's rain.",
        },
      ],
      images: ["https://via.placeholder.com/400x300", "https://via.placeholder.com/400x300"],
    };
    
    // Display report details
    displayReportDetails(reportDetail);
  }
  
  // Display report details
  function displayReportDetails(report) {
    // Set page title
    document.title = `${report.id} - ${report.title} | Public Grievance Portal`;
    
    // Set report title and ID
    document.getElementById('reportTitle').textContent = 'Report Details';
    document.getElementById('reportTitleHeader').textContent = report.title;
    document.getElementById('reportId').textContent = `ID: ${report.id}`;
    
    // Set report status badge
    const statusBadge = document.getElementById('reportStatus');
    statusBadge.textContent = report.status;
    statusBadge.className = `badge ${report.status === 'Resolved' ? 'bg-success' : report.status === 'Pending' ? 'bg-warning' : 'bg-info'}`;
    
    // Set report details
    document.getElementById('reportLocation').textContent = report.location;
    document.getElementById('reportDate').textContent = report.date;
    document.getElementById('reportSubmitter').textContent = report.submittedBy.name;
    document.getElementById('reportSubmitterEmail').textContent = report.submittedBy.email;
    
    // Set report priority
    const priorityElement = document.getElementById('reportPriority');
    priorityElement.textContent = report.priority;
    priorityElement.className = report.priority === 'High' ? 'text-danger' : report.priority === 'Medium' ? 'text-warning' : 'text-success';
    
    // Set report description
    document.getElementById('reportDescription').textContent = report.description;
    
    // Set report images
    const imagesContainer = document.getElementById('reportImages');
    let imagesHTML = '';
    
    report.images.forEach((image, index) => {
      imagesHTML += `
        <div class="col-md-6 mb-3">
          <div class="border rounded overflow-hidden">
            <img src="${image}" alt="Report image ${index + 1}" class="img-fluid">
          </div>
        </div>
      `;
    });
    
    imagesContainer.innerHTML = imagesHTML;
    
    // Set report department
    document.getElementById('reportDepartment').textContent = report.department;
    document.getElementById('departmentEmail').textContent = `${report.department.toLowerCase().replace(' ', '.')}@example.gov`;
    document.getElementById('departmentPhone').textContent = '555-789-1234';
    
    // Set form values
    document.getElementById('statusSelect').value = report.status;
    document.getElementById('prioritySelect').value = report.priority;
    document.getElementById('assignedToSelect').value = report.assignedTo;
    
    // Display comments
    displayComments(report.comments);
    
    // Display timeline
    displayTimeline(report.timeline);
  }
  
  // Display comments
  function displayComments(comments) {
    const commentsContainer = document.getElementById('commentsList');
    let commentsHTML = '';
    
    comments.forEach(comment => {
      commentsHTML += `
        <div class="d-flex gap-3 pb-3 mb-3 border-bottom">
          <div class="avatar bg-primary text-white">
            ${comment.user.charAt(0)}
          </div>
          <div>
            <div class="d-flex align-items-center gap-2 mb-1">
              <p class="fw-medium mb-0">${comment.user}</p>
              <small class="text-muted">${comment.date}</small>
            </div>
            <p class="mb-0">${comment.text}</p>
          </div>
        </div>
      `;
    });
    
    commentsContainer.innerHTML = commentsHTML;
  }
  
  // Display timeline
  function displayTimeline(timeline) {
    const timelineContainer = document.getElementById('timelineList');
    let timelineHTML = '';
    
    timeline.forEach((event, index) => {
      timelineHTML += `
        <div class="timeline-item">
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <h6 class="fw-medium mb-1">${event.action}</h6>
            <div class="d-flex align-items-center gap-2 mb-1">
              <i class="bi bi-clock text-muted"></i>
              <small class="text-muted">${event.date}</small>
            </div>
            <div class="d-flex align-items-center gap-2 mb-1">
              <i class="bi bi-person text-muted"></i>
              <small class="text-muted">${event.user}</small>
            </div>
            <p>${event.notes}</p>
          </div>
        </div>
      `;
    });
    
    timelineContainer.innerHTML = timelineHTML;
  }
  
  // Update report
  function updateReport(reportId) {
    const status = document.getElementById('statusSelect').value;
    const priority = document.getElementById('prioritySelect').value;
    const assignedTo = document.getElementById('assignedToSelect').value;
    
    // Load reports from localStorage or use mock data
    const reports = JSON.parse(localStorage.getItem('reports') || '[]');
    const allReports = [...mockReports, ...reports];
    
    // Find report index
    const reportIndex = allReports.findIndex(r => r.id === reportId);
    
    if (reportIndex === -1) {
      showAlert('Report not found', 'danger');
      return;
    }
    
    // Update report
    allReports[reportIndex] = {
      ...allReports[reportIndex],
      status,
      priority,
      assignedTo,
    };
    
    // Save to localStorage
    localStorage.setItem('reports', JSON.stringify(allReports));
    
    // Add to timeline
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userName = currentUser ? currentUser.name : 'Admin User';
    
    const newEvent = {
      date: new Date().toLocaleString(),
      action: "Status updated",
      user: userName,
      notes: `Changed status to ${status}, priority to ${priority}, and assigned to ${assignedTo}`,
    };
    
    const timelineContainer = document.getElementById('timelineList');
    const timelineHTML = `
      <div class="timeline-item">
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <h6 class="fw-medium mb-1">${newEvent.action}</h6>
          <div class="d-flex align-items-center gap-2 mb-1">
            <i class="bi bi-clock text-muted"></i>
            <small class="text-muted">${newEvent.date}</small>
          </div>
          <div class="d-flex align-items-center gap-2 mb-1">
            <i class="bi bi-person text-muted"></i>
            <small class="text-muted">${newEvent.user}</small>
          </div>
          <p>${newEvent.notes}</p>
        </div>
      </div>
    ` + timelineContainer.innerHTML;
    
    timelineContainer.innerHTML = timelineHTML;
    
    // Update status badge
    const statusBadge = document.getElementById('reportStatus');
    statusBadge.textContent = status;
    statusBadge.className = `badge ${status === 'Resolved' ? 'bg-success' : status === 'Pending' ? 'bg-warning' : 'bg-info'}`;
    
    showAlert('Report updated successfully', 'success');
  }
  
  // Add comment
  function addComment(reportId) {
    const commentText = document.getElementById('commentText').value;
    
    if (!commentText.trim()) {
      showAlert('Please enter a comment', 'warning');
      return;
    }
    
    // Get current user
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userName = currentUser ? currentUser.name : 'Admin User';
    
    // Create new comment
    const newComment = {
      id: Date.now(),
      user: userName,
      date: new Date().toLocaleString(),
      text: commentText,
    };
    
    // Add to comments list
    const commentsContainer = document.getElementById('commentsList');
    const commentHTML = `
      <div class="d-flex gap-3 pb-3 mb-3 border-bottom">
        <div class="avatar bg-primary text-white">
          ${newComment.user.charAt(0)}
        </div>
        <div>
          <div class="d-flex align-items-center gap-2 mb-1">
            <p class="fw-medium mb-0">${newComment.user}</p>
            <small class="text-muted">${newComment.date}</small>
          </div>
          <p class="mb-0">${newComment.text}</p>
        </div>
      </div>
    ` + commentsContainer.innerHTML;
    
    commentsContainer.innerHTML = commentHTML;
    
    // Clear comment input
    document.getElementById('commentText').value = '';
    
    // Add to timeline
    const timelineContainer = document.getElementById('timelineList');
    const timelineHTML = `
      <div class="timeline-item">
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <h6 class="fw-medium mb-1">Comment added</h6>
          <div class="d-flex align-items-center gap-2 mb-1">
            <i class="bi bi-clock text-muted"></i>
            <small class="text-muted">${newComment.date}</small>
          </div>
          <div class="d-flex align-items-center gap-2 mb-1">
            <i class="bi bi-person text-muted"></i>
            <small class="text-muted">${newComment.user}</small>
          </div>
          <p>${newComment.text}</p>
        </div>
      </div>
    ` + timelineContainer.innerHTML;
    
    timelineContainer.innerHTML = timelineHTML;
    
    showAlert('Comment added successfully', 'success');
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
      description: "Large pothole causing traffic hazards. Multiple vehicles have reported damage. The pothole is approximately 2 feet wide and 8 inches deep. It's located in the right lane of Main Street, just before the intersection with Oak Avenue.",
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
      description: "Three consecutive streetlights not working on Oak Avenue between 4th and 5th Street. The area is very dark at night, creating safety concerns for pedestrians.",
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
      description: "Garbage not collected for two weeks on Pine Street. Multiple households affected. Regular collection day is Tuesday.",
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
      description: "Discolored water coming from taps in the Elm Street neighborhood. Water has a brownish tint and metallic taste. Multiple households reporting the same issue.",
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
      description: "Swing set broken and potentially dangerous at the City Park playground. One of the chains is broken and there are sharp edges exposed.",
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
      description: "Traffic light stuck on red in all directions at the intersection of Main Street and 5th Avenue. Causing significant traffic congestion during rush hour.",
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
      description: "Graffiti on the east wall of city hall. Approximately 3 feet by 5 feet in size. Contains inappropriate language and imagery.",
    },
  ];
// main.js - Common functionality for all pages

// Show alert message
function showAlert(message, type = 'success') {
    const alertContainer = document.getElementById('alertContainer');
    if (!alertContainer) return;
  
    const alertHTML = `
      <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
  
    alertContainer.innerHTML = alertHTML;
  
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      const alert = document.querySelector('.alert');
      if (alert) {
        const bsAlert = new bootstrap.Alert(alert);
        bsAlert.close();
      }
    }, 5000);
  }
  
  // Sidebar toggle functionality
  document.addEventListener("DOMContentLoaded", () => {
    const sidebarToggle = document.getElementById("sidebarToggle");
    const adminSidebar = document.getElementById("adminSidebar");
    const adminContent = document.querySelector(".admin-content");
  
    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", () => {
        adminSidebar.classList.toggle("expanded");
        adminContent.classList.toggle("sidebar-expanded");
  
        // Toggle icon
        const icon = sidebarToggle.querySelector("i");
        if (icon.classList.contains("bi-chevron-left")) {
          icon.classList.replace("bi-chevron-left", "bi-chevron-right");
        } else {
          icon.classList.replace("bi-chevron-right", "bi-chevron-left");
        }
      });
    }
  
    // Responsive sidebar behavior
    function handleResize() {
      if (window.innerWidth > 768) {
        if (adminSidebar) {
          adminSidebar.classList.remove("expanded");
        }
        if (adminContent) {
          adminContent.classList.remove("sidebar-expanded");
        }
      }
    }
  
    window.addEventListener("resize", handleResize);
    handleResize();
  });
  
  // Format date
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }
  
  // Format date with time
  function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString();
  }
  
  // Get URL parameters
  function getUrlParams() {
    const params = {};
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
  
    for (const [key, value] of urlParams.entries()) {
      params[key] = value;
    }
  
    return params;
  }
  
  // Export data to CSV
  function exportToCSV(data, filename) {
    // Convert data to CSV format
    const csvRows = [];
  
    // Get headers
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));
  
    // Add data rows
    for (const row of data) {
      const values = headers.map(header => {
        const value = row[header];
        return `"${value}"`;
      });
      csvRows.push(values.join(','));
    }
  
    // Create and download CSV file
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  
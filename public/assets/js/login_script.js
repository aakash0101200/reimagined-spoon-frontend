document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const collegeID = document.getElementById('college-id');
  const password = document.getElementById('password');
  const roleSelect = document.getElementById('role');

  // Add password toggle button
  const toggleBtn = document.createElement("button");
  toggleBtn.type = "button";
  toggleBtn.innerText = "Show";
  toggleBtn.classList.add("toggle-password");
  password.parentNode.appendChild(toggleBtn);

  loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const idValue = collegeID.value.trim();
    const passwordValue = password.value.trim();
    const roleValue = roleSelect.value.toUpperCase(); // Convert to uppercase

    // Basic validation
    if (!idValue || !passwordValue || roleValue === "SELECT") {
      alert("Please fill in all fields.");
      return;
    }

    try {
      // Show loading state
      const submitBtn = loginForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<div class="spinner"></div> Authenticating...';

      
      // Send login request to backend with role
      const response = await fetch('http://localhost:8080/api/public/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          collegeId: idValue,
          password: passwordValue,
          role: roleValue // Include role in request
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      
      // Store token and role
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userRole', data.role);
      localStorage.setItem('collegeId', idValue);

      // Redirect based on role from backend response
      redirectBasedOnRole(data.role);
      
    } catch (error) {
      console.error('Login failed:', error);
      alert(`Login failed: ${error.message || 'Invalid credentials'}`);
      
      // Reset button
      const submitBtn = loginForm.querySelector('button[type="submit"]');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Sign in';
    }
  });

  // Toggle password visibility
  toggleBtn.addEventListener('click', function() {
    if (password.type === 'password') {
      password.type = 'text';
      toggleBtn.innerText = 'Hide';
    } else {
      password.type = 'password';
      toggleBtn.innerText = 'Show';
    }
  });

  // Role-based redirection
  function redirectBasedOnRole(role) {
    switch(role) {
      case 'STUDENT':
        window.location.href = 'student-dashboard.html';
        break;
      case 'FACULTY':
        window.location.href = 'teacher-dashboard.html';
        break;
      case 'ADMIN':
        window.location.href = 'admin-dashboard.html';
        break;
      default:
        alert(`Unknown role: ${role}`);
    }
  }
});
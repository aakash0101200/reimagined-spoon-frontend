const form = document.querySelector("form");
const collegeID = document.getElementById("college-id");
const password = document.getElementById("password");
const roleSelect = document.getElementById("role");

form.addEventListener("submit", function(e) {
  e.preventDefault(); // Stop default form submit

  const idValue = collegeID.value.trim();
  const passwordValue = password.value.trim();
  const role = roleSelect.value;

  if (idValue === "" || passwordValue === "") {
    alert("Please fill in all fields.");
    return;
  }

  // ✅ Simulate successful login:
  alert("Login successful! Redirecting to " + role + " dashboard...");

  // ✅ Redirect to dashboard based on role
  if (role === "student") {
    window.location.href = "student-dashboard.html";
  } else if (role === "teacher") {
    window.location.href = "teacher-dashboard.html";
  } else if (role === "admin") {
    window.location.href = "admin-dashboard.html";
  } else {
    alert("Unknown role!");
  }
});

// ✅ Toggle password visibility
const toggleBtn = document.createElement("button");
toggleBtn.type = "button";
toggleBtn.innerText = "Show";
toggleBtn.style.marginLeft = "10px";

password.parentNode.insertBefore(toggleBtn, password.nextSibling);

toggleBtn.addEventListener("click", function() {
  if (password.type === "password") {
    password.type = "text";
    toggleBtn.innerText = "Hide";
  } else {
    password.type = "password";
    toggleBtn.innerText = "Show";
  }
});

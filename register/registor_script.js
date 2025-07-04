const form = document.getElementById('registerForm');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const terms = document.getElementById('terms');
const createBtn = document.getElementById('createBtn');

const inputs = form.querySelectorAll('input, select');

function validateForm() {
  let valid = true;

  inputs.forEach(input => {
    if (!input.checkValidity()) {
      valid = false;
    }
  });

  if (password.value !== confirmPassword.value) {
    valid = false;
  }

  if (!terms.checked) {
    valid = false;
  }

  createBtn.disabled = !valid;
}

inputs.forEach(input => {
  input.addEventListener('input', validateForm);
  input.addEventListener('change', validateForm);
});

termsLink.addEventListener('click', function() {
    if (termsDetails.style.display === 'none') {
      termsDetails.style.display = 'block';
    } else {
      termsDetails.style.display = 'none';
    }
  });
  
form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (createBtn.disabled) {
    alert('Please complete the form correctly.');
    return;
  }
  alert('Account created successfully!');
  // Add actual form submit logic here
});

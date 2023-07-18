const loginFormHandler = async (event) => {
  event.preventDefault();

  // Get the login form inputs
  const email = document.querySelector('#email-input').value.trim();
  const password = document.querySelector('#password-input').value.trim();

  if (email && password) {
    // Send a POST request to the server with the login credentials
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If login is successful, redirect to the dashboard page
      document.location.replace('/dashboard');
    } else {
      // If login fails, display an error message
      const errorMessage = await response.json();
      alert(errorMessage.message);
    }
  }
};

// Attach the loginFormHandler to the login form submit event
document.querySelector('#login-form').addEventListener('submit', loginFormHandler);
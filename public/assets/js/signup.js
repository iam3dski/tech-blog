const signupFormHandler = async (event) => {
  event.preventDefault();

  // Get the signup form inputs
  const name = document.querySelector('#name-input').value.trim();
  const email = document.querySelector('#email-input').value.trim();
  const password = document.querySelector('#password-input').value.trim();

  if (name && email && password) {
    // Send a POST request to the server with the signup data
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If signup is successful, redirect to the dashboard page
      document.location.replace('/dashboard');
    } else {
      // If signup fails, display an error message
      const errorMessage = await response.json();
      alert(errorMessage.message);
    }
  }
};

// Attach the signupFormHandler to the signup form submit event
document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);
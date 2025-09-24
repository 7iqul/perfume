document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const message = document.getElementById('message');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (email === "user@example.com" && password === "123456") {
      message.textContent = "Login Successful! Welcome to My Fragrance.";
      message.style.color = "green";
    } else {
      message.textContent = "Invalid email or password. Please try again.";
      message.style.color = "red";
    }

    loginForm.reset();
  });
});


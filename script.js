document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("auth-form");
  const title = document.getElementById("form-title");
  const toggleText = document.getElementById("toggle-link");
  const passwordInput = document.getElementById("password");
  const togglePassword = document.getElementById("toggle-password");
  const loginButton = document.querySelector(".login__button");

  let isLogin = true;

  const updateForm = () => {
      title.textContent = isLogin ? "Login" : "Sign Up";
      toggleText.innerHTML = isLogin
          ? "Don't have an account? <span>Sign Up</span>"
          : "Already have an account? <span>Login</span>";
      loginButton.textContent = isLogin ? "Login" : "Sign Up";
  };

  const toggleForm = () => {
      isLogin = !isLogin;
      updateForm();
  };

  toggleText.addEventListener("click", toggleForm);

  togglePassword.addEventListener("click", () => {
      if (passwordInput.type === "password") {
          passwordInput.type = "text";
          togglePassword.classList.replace("ri-eye-off-line", "ri-eye-line");
      } else {
          passwordInput.type = "password";
          togglePassword.classList.replace("ri-eye-line", "ri-eye-off-line");
      }
  });

  form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const username = document.getElementById("username").value;
      const password = passwordInput.value;

      const endpoint = isLogin
          ? "http://localhost:5000/api/login"
          : "http://localhost:5000/api/signup";

      const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      alert(data.message);

      if (isLogin && response.ok) {
          localStorage.setItem("authToken", data.token);
          window.location.href = "../Game/index.html";
      }
  });
});

async function loginForm() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const user = {
    email: email,
    password: password
  };

  try {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Login failed!");
    }

    const data = await response.json();
    console.log(data);
    // Call the handleSuccessfulLogin function and pass the token received from the server
    handleSuccessfulLogin(data.token);
    
  } catch (err) {
    console.log(err);
    // Handle errors during login here
    
  }
};

const loginButton = document.getElementById('loginButton');
loginButton.addEventListener('click', loginForm);

sessionStorage.setItem("userId", "token");
console.log(sessionStorage.getItem("userId"));
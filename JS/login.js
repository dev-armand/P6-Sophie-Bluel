const urlApi = "http://localhost:5678/api";
const loginButton = document.querySelector('#loginButton');
loginButton.addEventListener('click', loginForm);

async function handleSuccessfulLogin(token) {
  // Save the token to sessionStorage
  sessionStorage.setItem("token", token);

  // Redirect the user to index.html
  window.location.href = "index.html";
}

// Login function
async function loginForm() {
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  const user = {
    email: email,
    password: password
  };

  try {
    const response = await fetch(`${urlApi}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Login failed!");
    }

    // Response from the server and extracts the JSON data
    const data = await response.json();
    console.log(data);
    handleSuccessfulLogin(data.token);
    
  } catch (err) {
    console.log(err);
    alert("Email ou mot de passe incorrecte !");
  }
}
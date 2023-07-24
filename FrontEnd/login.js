
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
    // Handle the successful login response here
  } catch (err) {
    console.log(err);
    // Handle errors during login here
  }
};

// fonction de gestion du formulaire de connexion
function handleLogin(event){
  event.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const result = login(email, password);
  result.then(message => {
    alert(message);
  });
};

// event listener 
addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector(".loginForm");
  loginForm.addEventListener("submit", handleLogin);
});
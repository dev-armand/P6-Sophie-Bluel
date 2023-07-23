
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
    // condition si mot de passe correcte
    if (user.password === password) {
      return "Connexion réussie!";
    } else {
      return "Mot de passe incorrecte!"
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    return "Une erreur s'est produite lors de la connexion. ";
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
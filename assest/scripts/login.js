document.getElementById("form-login").addEventListener("submit", function(e) {
  e.preventDefault(); // Impede o envio do formulário

  // Obter os valores do email e senha
  var email = document.getElementById("email").value;
  var password = document.getElementById("senha").value;

  // Limpar as mensagens de erro e sucesso
  document.getElementById("error-message").textContent = "";
  document.getElementById("success-message").textContent = "";

  // Validar se o email e a senha estão preenchidos
  if (email === "" || password === "") {
    document.getElementById("error-message").textContent = "Por favor, preencha todos os campos.";
  } else {
    // Verificar se o usuário está cadastrado (este é apenas um exemplo simples)
    if (email === "usuario@example.com" && password === "senha123") {
      document.getElementById("success-message").textContent = "Login realizado com sucesso!";
    } else {
      document.getElementById("error-message").textContent = "Usuário não cadastrado.";
    }
  }
});



document.getElementById("form-cadastro").addEventListener("submit", function(e) {
  e.preventDefault(); // Impede o envio do formulário

  // Obter os valores do email, senha e confirmar senha
  var email = document.getElementById("email-cadastro").value;
  var password = document.getElementById("senha").value;
  var confirmPassword = document.getElementById("confirmar-senha").value;

  // Limpar as mensagens de erro e sucesso
  document.getElementById("error-message").textContent = "";
  document.getElementById("success-message").textContent = "";

  // Validar se os campos estão preenchidos
  if (email === "" || password === "" || confirmPassword === "") {
    document.getElementById("error-message").textContent = "Por favor, preencha todos os campos.";
  }
  // Validar o formato de email
  else if (!validateEmail(email)) {
    document.getElementById("error-message").textContent = "Digite um email válido.";
  }
  // Validar a senha
  else if (password.length < 6) {
    document.getElementById("error-message").textContent = "A senha deve ter pelo menos 6 caracteres.";
  }
  // Validar se as senhas são iguais
  else if (password !== confirmPassword) {
    document.getElementById("error-message").textContent = "As senhas não são iguais.";
  }
  // Cadastro bem-sucedido
  else {
    document.getElementById("success-message").textContent = "Cadastro realizado com sucesso!";
  }
});

// Função para validar o formato de email usando expressão regular
function validateEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}









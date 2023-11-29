let user_logado = JSON.parse(localStorage.getItem('user_logado')) || false;
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const toggleButton = document.querySelector('.toggle-password');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleButton.textContent = 'Ocultar';
    } else {
        passwordInput.type = 'password';
        toggleButton.textContent = 'Ver';
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+(\.[^\s@]+)?$/;
    return emailRegex.test(email);
}

function login() {
    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;

    if (!isValidEmail(emailInput)) {
        alert('Por favor, insira um e-mail válido.');
        return;
    }

    const user = usuarios.find((usuario) => usuario.email === emailInput && usuario.senha === passwordInput);

    if (user) {
        alert('Login bem-sucedido!');
        user_logado = true;
        localStorage.setItem('user_logado', JSON.stringify(user_logado));
        window.location.href = 'store.html';
    } else {
        alert('Usuário/E-mail ou senha incorretos. Tente novamente.');
    }
}

function logout() {
    user_logado = false;
    localStorage.removeItem('user_logado');
    window.location.href = 'logout.html';
}

function goBack() {
    window.location.href = 'index.html';
}

function backToMenu() {
    window.location.href = 'store.html';
}

function register() {
    window.location.href = 'cadastro.html';
}

window.addEventListener('beforeunload', function () {
    user_logado = false;
    localStorage.removeItem('user_logado');
});

window.addEventListener('load', function () {
    usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
});

function saveUserData(usuario) {
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

function saveData() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;
    const nomeCompleto = document.getElementById('username').value;
    const rua = document.getElementById('street').value;
    const numero = document.getElementById('number').value;
    const complemento = document.getElementById('complement').value;
    const bairro = document.getElementById('neighborhood').value;
    const cidade = document.getElementById('city').value;
    const uf = document.getElementById('state').value;
    const cep = document.getElementById('zip').value;
    const telefone = document.getElementById('phone').value;

    saveUserData({
        email,
        senha,
        endereco: {
            nomeCompleto,
            rua,
            numero,
            complemento,
            bairro,
            cidade,
            uf,
            cep,
        },
        telefone,
    });

    alert('Cadastro realizado com sucesso!');
    window.location.href = 'cadastro.html';
}

function validateForm() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const username = document.getElementById('username').value;
    const street = document.getElementById('street').value;
    const number = document.getElementById('number').value;
    const complement = document.getElementById('complement').value;
    const neighborhood = document.getElementById('neighborhood').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zip = document.getElementById('zip').value;
    const phone = document.getElementById('phone').value;

    if (!email || !password || !username || !street || !number || !neighborhood || !city || !state || !zip || !phone) {
        alert('Por favor, preencha todos os campos do formulário.');
        return false;
    }

    return true;
}

function loadPage(page) {
    window.location.href = page;
}

function buyItems() {
    window.location.href = 'pedido.html';
}

function printOrder() {
    window.print();
}

class UserData {
    constructor(email, senha, endereco, telefone) {
        this.email = email;
        this.senha = senha;
        this.endereco = endereco;
        this.telefone = telefone;
    }
}

const usuario1 = new UserData(
    "usuario1@example.com",
    "senha1",
    {
        nomeCompleto: "Fulano de Tal",
        rua: "Rua Principal",
        numero: "123",
        complemento: "Apto 1",
        bairro: "Centro",
        cidade: "Cidade",
        uf: "SP",
        cep: "12345-678",
    },
    "(99) 9999-9999"
);

const usuarios = [usuario1];

usuarios.forEach(usuario => {
    console.log("Email:", usuario.email);
    console.log("Senha:", usuario.senha);
    console.log("Endereço:", usuario.endereco);
    console.log("Telefone:", usuario.telefone);
    console.log("UF:", usuario.endereco.uf);
    console.log();
});

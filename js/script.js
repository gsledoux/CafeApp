let user_logado = JSON.parse(localStorage.getItem('user_logado')) || false;
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

class Product {
    constructor(id, name, image, price) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.price = price;
        this.quantity = 0;
    }
}

const products = [
    new Product('cafeLeite', 'Café com Leite', 'images/cafeleite.png', 5.00),
    new Product('expresso', 'Expresso', 'images/expresso.png', 3.50),
    new Product('mocha', 'Mocha', 'images/mocha.png', 4.00),
    new Product('cha', 'Chá', 'images/cha.png', 2.50),
];

function renderProducts() {
    const storeSection = document.getElementById('store-section');
    if (!storeSection) {
        console.error('Elemento store-section não encontrado no HTML.');
        return;
    }

    products.forEach(product => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('items');

        const productDiv = document.createElement('div');
        productDiv.classList.add('item-store');
        productDiv.id = product.id;
        productDiv.innerHTML = `<img src="${product.image}" alt="${product.name}">`;

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('infos');

        const infoStoreDiv = document.createElement('div');
        infoStoreDiv.classList.add('info-store');

        const nameLabel = document.createElement('label');
        nameLabel.classList.add('items-label');
        nameLabel.htmlFor = product.id;
        nameLabel.textContent = product.name;

        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.id = `quantity${product.id}`;
        quantityInput.name = `quantity${product.id}`;
        quantityInput.value = 0;
        quantityInput.min = 0;
        quantityInput.addEventListener('change', () => updateTotal(product.id, product.price, `total${product.id}`));

        const priceLabel = document.createElement('label');
        priceLabel.htmlFor = `preco${product.id}`;
        priceLabel.textContent = 'Preço:';

        const priceSpan = document.createElement('span');
        priceSpan.id = `preco${product.id}`;
        priceSpan.textContent = `R$ ${product.price.toFixed(2)}`;

        const totalLabel = document.createElement('label');
        totalLabel.htmlFor = `total${product.id}`;
        totalLabel.textContent = 'Total:';

        const totalSpan = document.createElement('span');
        totalSpan.id = `total${product.id}`;
        totalSpan.textContent = 'R$ 0,00';

        infoStoreDiv.appendChild(nameLabel);
        infoStoreDiv.appendChild(createInlineForm('Quantidade:', quantityInput));
        infoStoreDiv.appendChild(createInlineForm('Preço:', priceSpan));
        infoStoreDiv.appendChild(createInlineForm('Total:', totalSpan));

        infoDiv.appendChild(infoStoreDiv);

        itemDiv.appendChild(productDiv);
        itemDiv.appendChild(infoDiv);

        storeSection.appendChild(itemDiv);
    });
}

function createInlineForm(labelText, element) {
    const inlineFormDiv = document.createElement('div');
    inlineFormDiv.classList.add('inline-form');

    const label = document.createElement('label');
    label.textContent = labelText;

    inlineFormDiv.appendChild(label);
    inlineFormDiv.appendChild(element);

    return inlineFormDiv;
}

function updateTotal(productId, productPrice, totalId) {
    const quantityInput = document.getElementById(`quantity${productId}`);
    const totalSpan = document.getElementById(totalId);

    const quantity = parseInt(quantityInput.value);
    const total = quantity * productPrice;

    totalSpan.textContent = `R$ ${total.toFixed(2)}`;
}

window.addEventListener('load', function () {
    renderProducts();
});

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
        user_logado = true;
        localStorage.setItem('user_logado', JSON.stringify(user));
        window.location.href = 'store.html';
    } else {
        alert('Usuário/E-mail ou senha incorretos. Tente novamente.');
    }
}

function logout() {
    user_logado = false;
    localStorage.removeItem('user_logado');
    window.location.href = 'index.html';
}

function goBack() {
    window.location.href = 'login.html';
}

function voltarAoStore() {
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

    if (usuarios.length === 0) {
        const usuarioPadrao = new UserData(
            "admin@example.com",
            "adminpassword",
            {
                nomeCompleto: "Admin",
                rua: "Rua Admin",
                numero: "1",
                complemento: "Admin",
                bairro: "Admin",
                cidade: "Admin City",
                uf: "SP",
                cep: "12345-678",
            },
            "(99) 9999-9999"
        );

        usuarios.push(usuarioPadrao);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
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
    window.location.href = 'login.html';
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
    const items = products.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: parseInt(document.getElementById(`quantity${product.id}`).value) || 0,
    })).filter(item => item.quantity > 0);

    if (items.length === 0) {
        alert('Seu carrinho está vazio. Adicione itens antes de comprar.');
        return;
    }
    localStorage.setItem('itemsComprados', JSON.stringify(items));
    window.location.href = 'pedido.html';
}

function getCurrentUser() {
    const user = JSON.parse(localStorage.getItem('user_logado'));
    return usuarios.find(usuario => usuario.email === user.email);
}

function generateReceipt(user) {
    if (!user) {
        alert('Usuário não está logado. Faça login antes de realizar uma compra.');
        return;
    }

    const items = JSON.parse(localStorage.getItem('itemsComprados')) || [];
    const totalGeral = items.reduce((total, item) => total + (item.quantity * item.price), 0);

    const receiptMessage = `
    Pedido Efetuado com sucesso

    ------------------------------------------------
    Item            Qtd         Valor       Total
    ------------------------------------------------
    ${items.map(item => `${item.name.padEnd(15)}${item.quantity.toString().padEnd(12)}R$ ${item.price.toFixed(2).toString().padEnd(12)}R$ ${(item.quantity * item.price).toFixed(2)}`).join('\n')}
    ------------------------------------------------
    Total Geral:                           R$ ${totalGeral.toFixed(2)}
    ------------------------------------------------
    Informações
    ------------------------------------------------
    Nome: "${user.endereco.nomeCompleto}"
    Fone: "${user.telefone}"
    ------------------------------------------------
    Endereço
    rua: "${user.endereco.rua}"
    numero: "${user.endereco.numero}"               complemento: "${user.endereco.complemento}"
    bairro: "${user.endereco.bairro}"
    Cidade: "${user.endereco.cidade}"    UF: "${user.endereco.uf}"     CEP: "${user.endereco.cep}"
    Muito Obrigado!
    `;

    return receiptMessage;
}

function printOrder() {
    const pedidoSection = document.getElementById('pedido-section');
    const user = getCurrentUser();
    const receiptMessage = generateReceipt(user);

    const receiptDiv = document.createElement('div');
    receiptDiv.innerHTML = `<pre>${receiptMessage}</pre>`;

    pedidoSection.innerHTML = '';
    pedidoSection.appendChild(receiptDiv);
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

usuarios = [usuario1];

usuarios.forEach(usuario => {
    console.log("Email:", usuario.email);
    console.log("Senha:", usuario.senha);
    console.log("Endereço:", usuario.endereco);
    console.log("Telefone:", usuario.telefone);
    console.log("UF:", usuario.endereco.uf);
    console.log();
});

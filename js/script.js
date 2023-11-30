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
        alert('Login bem-sucedido!');
        user_logado = true;
        localStorage.setItem('user_logado', JSON.stringify({ email: user.email }));
        window.location.href = 'store.html';
    } else {
        loginDefaultUser();
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
        usuarios.push(admin, cliente);
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

    const user = admin;
    
    localStorage.setItem('itemsComprados', JSON.stringify(items));
    localStorage.setItem('usuarioCompra', JSON.stringify(user));
    window.location.href = 'pedido.html';
    printOrder();

}

function getCurrentUser() {
    const user = admin;
    return user ? usuarios.find(usuario => usuario.email === user.email) : null;
}

function generateReceipt(user) {
    const items = JSON.parse(localStorage.getItem('itemsComprados')) || [];
    const totalGeral = items.reduce((total, item) => total + (item.quantity * item.price), 0);

    const receiptContainer = document.createElement('div');
    receiptContainer.classList.add('receipt-container');

    const header = document.createElement('h3');
    header.textContent = 'Pedido Efetuado com sucesso';
    receiptContainer.appendChild(header);

    const itemList = document.createElement('ul');
    itemList.classList.add('item-list');

    items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <span class="item-name">${item.name}</span><br> 
        <span class="item-inf"> Qtd: ${item.quantity} &nbsp &nbsp; &nbsp &nbsp; &nbsp &nbsp; Preço: &nbsp R$ ${item.price.toFixed(2)}</span><br> 
        <span class="item-inf"> Total por item: &nbsp &nbsp &nbsp &nbsp &nbsp; R$ ${(item.quantity * item.price).toFixed(2)}</span><br> `;
        itemList.appendChild(listItem);
    });

    receiptContainer.appendChild(itemList);

    const totalLabel = document.createElement('div');
    totalLabel.classList.add('total');
    totalLabel.textContent = `Total Geral: R$ ${totalGeral.toFixed(2)}`;
    receiptContainer.appendChild(totalLabel);

    const userInfo = document.createElement('div');
    userInfo.classList.add('user-info');
    userInfo.innerHTML = `Nome: ${user.endereco.nomeCompleto}<br>Fone: ${user.telefone}`;
    receiptContainer.appendChild(userInfo);

    const addressInfo = document.createElement('div');
    addressInfo.classList.add('address-info');
    addressInfo.innerHTML = `Rua: ${user.endereco.rua} &nbsp &nbsp; Número: ${user.endereco.numero} <br> Complemento: ${user.endereco.complemento}<br>Bairro: ${user.endereco.bairro}<br>Cidade: ${user.endereco.cidade} &nbsp &nbsp; UF: ${user.endereco.uf} 
    <br>CEP: ${user.endereco.cep}`;
    receiptContainer.appendChild(addressInfo);

    const thankYou = document.createElement('div');
    thankYou.classList.add('thank-you');
    thankYou.textContent = 'Muito Obrigado!';
    receiptContainer.appendChild(thankYou);

    return receiptContainer;
}

function printOrder() {
    const pedidoSection = document.getElementById('pedido-section');
    const user = admin;
    const receiptContainer = generateReceipt(user);

    pedidoSection.innerHTML = '';
    pedidoSection.appendChild(receiptContainer);
}
function printReceipt() {
    print();
}
class UserData {
    constructor(email, senha, endereco, telefone) {
        this.email = email;
        this.senha = senha;
        this.endereco = endereco;
        this.telefone = telefone;
    }
}

const cliente = new UserData(
    "cliente@example.com",
    "senhacliente",
    {
        nomeCompleto: "Cliente",
        rua: "Rua do Cliente",
        numero: "123",
        complemento: "Apto 2",
        bairro: "Bairro do Cliente",
        cidade: "Cidade do Cliente",
        uf: "RJ",
        cep: "98765-432",
    },
    "(88) 8888-8888"
);

const admin = {
    email: "admin@example.com",
    senha: "admin",
    endereco: {
        nomeCompleto: "Admin",
        rua: "Rua Admin",
        numero: "1",
        complemento: "Admin",
        bairro: "Admin",
        cidade: "Admin City",
        uf: "SP",
        cep: "12345-678",
    },
    telefone: "(88) 8888-8888"
};

function loginDefaultUser() {
    const defaultUser = usuarios[0];

    if (defaultUser) {
        user_logado = true;
        localStorage.setItem('user_logado', JSON.stringify({ email: defaultUser.email }));
        alert('Login automático bem-sucedido!');
        window.location.href = 'store.html';
    } else {
        alert('Usuário padrão não encontrado. Faça o cadastro ou tente novamente.');
    }
}
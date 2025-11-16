









/**
 * =================================================================
 * 2. Lógica da Tela de Cadastro (Modais)
 * =================================================================
 */

// Função para fechar todos os modais e remover o destaque (active) de todos os botões
function resetModalsAndButtons() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
}

// Abre o modal correto e destaca o botão
function openModal(modalId) {
    // Só executa se o elemento existir (para não dar erro em outras páginas)
    if (!document.getElementById(modalId)) return;

    resetModalsAndButtons();
    
    // Exibe o modal correto
    document.getElementById(modalId).style.display = 'block';
    
    // Adiciona o destaque (active) ao botão que abriu
    const buttonId = 'btn-' + modalId.replace('Modal', '');
    const buttonElement = document.getElementById(buttonId);
    if (buttonElement) {
        buttonElement.classList.add('active');
    }
}

// Função simplificada para fechar um modal específico
function closeModal(modalId) {
    // Só executa se o elemento existir
    if (!document.getElementById(modalId)) return;
    
    document.getElementById(modalId).style.display = 'none';
    
    // Garante que o destaque do botão seja removido ao fechar
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
}

// Abre o modal de Fornecedor por padrão ao carregar a página de Cadastro
if (window.location.pathname.includes('cadastro.html')) {
    window.onload = function() {
        openModal('fornecedorModal');
    };
}


/**
 * =================================================================
 * 3. Lógica da Tela de Pedido de Compra (Alternar Formulário)
 * =================================================================
 */

function showForm(formName) {
    // Só executa se os elementos existirem (apenas para a página pedido_compra.html)
    const fornecedorForm = document.getElementById('fornecedor-form');
    const produtoForm = document.getElementById('produto-form');
    if (!fornecedorForm || !produtoForm) return;


    // Remove a classe 'active' de todos os botões de tab
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));

    // Oculta todos os formulários
    fornecedorForm.style.display = 'none';
    produtoForm.style.display = 'none';

    // Exibe o formulário correto e destaca o botão
    if (formName === 'fornecedor') {
        fornecedorForm.style.display = 'flex';
        document.querySelector('[onclick="showForm(\'fornecedor\')"]').classList.add('active');
    } else if (formName === 'produto') {
        produtoForm.style.display = 'flex';
        document.querySelector('[onclick="showForm(\'produto\')"]').classList.add('active');
    }
}

// Ativa o formulário de Fornecedor por padrão ao carregar a página de Pedido de Compra
if (window.location.pathname.includes('pedido_compra.html')) {
    window.onload = function() {
         showForm('fornecedor');
    };
}
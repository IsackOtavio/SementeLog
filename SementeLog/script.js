
// Alternar formulários
function showForm(formName, event) {
    document.getElementById('fornecedor-form').style.display = formName === 'fornecedor' ? 'block' : 'none';
    document.getElementById('produto-form').style.display = formName === 'produto' ? 'block' : 'none';
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    if (event) event.target.classList.add('active');
}

// Token
function getToken() {
    return localStorage.getItem("token") || "";
}


////////////FORNECEDOR ////////////////////////////////////////////////////////////////

async function cadastrarFornecedor(e) {
    e.preventDefault();
    const dados = Object.fromEntries(new FormData(e.target));

    try {
        const res = await fetch("http://127.0.0.1:5000/fornecedor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + getToken()
            },
            body: JSON.stringify(dados)
        });

        const json = await res.json();
        alert(json.message || json.error);

        if (res.ok) e.target.reset();

    } catch (err) {
        alert("Erro: " + err);
    }
}

async function buscarFornecedor() {
    const cnpj = prompt("Digite o CNPJ:");
    if (!cnpj) return;

    try {
        const res = await fetch(`http://127.0.0.1:5000/fornecedor/cnpj/${cnpj}`, {
            headers: { "Authorization": "Bearer " + getToken() }
        });

        const json = await res.json();
        if (!res.ok) return alert(json.error);

        Object.keys(json).forEach(key => {
            const inp = document.querySelector(`[name="${key}"]`);
            if (inp) inp.value = json[key];
        });

        alert("Fornecedor carregado!");

    } catch {
        alert("Erro ao buscar fornecedor");
    }
}

async function atualizarFornecedor() {
    const cnpj = document.querySelector('[name="cnpj"]').value;
    if (!cnpj) return alert("Busque um fornecedor primeiro!");

    const dados = Object.fromEntries(new FormData(document.getElementById("fornecedor-form")));

    try {
        const res = await fetch(`http://127.0.0.1:5000/fornecedor/cnpj/${cnpj}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + getToken()
            },
            body: JSON.stringify(dados)
        });

        const json = await res.json();
        alert(json.message || json.error);

    } catch {
        alert("Erro ao atualizar fornecedor");
    }
}

async function deletarFornecedor() {
    const cnpj = document.querySelector('[name="cnpj"]').value;

    if (!cnpj) return alert("Digite ou busque um CNPJ!");
    if (!confirm("Confirmar exclusão?")) return;

    try {
        const res = await fetch(`http://127.0.0.1:5000/fornecedor/cnpj/${cnpj}`, {
            method: "DELETE",
            headers: { "Authorization": "Bearer " + getToken() }
        });

        const json = await res.json();
        alert(json.message || json.error);

        if (res.ok) document.getElementById("fornecedor-form").reset();

    } catch {
        alert("Erro ao deletar fornecedor");
    }
}



//////////////////// PRODUTO ////////////////////////////////////////////////////

async function cadastrarProduto(e) {
    e.preventDefault();
    const dados = Object.fromEntries(new FormData(e.target));

    try {
        const res = await fetch("http://127.0.0.1:5000/produto", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + getToken()
            },
            body: JSON.stringify(dados)
        });

        const json = await res.json();
        alert(json.message || json.error);

        if (res.ok) e.target.reset();

    } catch {
        alert("Erro ao cadastrar produto");
    }
}

async function buscarProduto() {
    const codigo = prompt("Digite o código:");
    if (!codigo) return;

    try {
        const res = await fetch(`http://127.0.0.1:5000/produto/${codigo}`, {
            headers: { "Authorization": "Bearer " + getToken() }
        });

        const json = await res.json();

        if (!res.ok) return alert(json.error);

        document.querySelector('[name="codigo"]').value = json.codigo;
        document.querySelector('[name="descricao"]').value = json.descricao;
        document.querySelector('[name="quantidade"]').value = json.quantidade;
        document.querySelector('[name="valor_unitario"]').value = json.valor_unitario;
        document.querySelector('[name="valor_total"]').value = json.valor_total;
        document.querySelector('[name="data_pedido"]').value = json.data_pedido;

        alert("Produto carregado!");

    } catch {
        alert("Erro ao buscar produto");
    }
}

async function atualizarProduto() {
    const codigo = document.querySelector('[name="codigo"]').value;
    if (!codigo) return alert("Busque um produto primeiro!");

    const dados = Object.fromEntries(new FormData(document.getElementById("produto-form")));

    try {
        const res = await fetch(`http://127.0.0.1:5000/produto/${codigo}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + getToken()
            },
            body: JSON.stringify(dados)
        });

        const json = await res.json();
        alert(json.message || json.error);

    } catch {
        alert("Erro ao atualizar produto");
    }
}

async function deletarProduto() {
    const codigo = document.querySelector('[name="codigo"]').value;
    if (!codigo) return alert("Digite ou busque um código!");
    if (!confirm("Deseja realmente excluir?")) return;

    try {
        const res = await fetch(`http://127.0.0.1:5000/produto/${codigo}`, {
            method: "DELETE",
            headers: { "Authorization": "Bearer " + getToken() }
        });

        const json = await res.json();
        alert(json.message || json.error);

        if (res.ok) document.getElementById("produto-form").reset();

    } catch {
        alert("Erro ao deletar produto");
    }
}

//////////////// SALVAR PRODUTO DO PEDIDO ///////////////////////////////

document.getElementById("produto-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const descricao = document.querySelector("input[name='descricao']").value;
    const quantidade = document.querySelector("input[name='quantidade']").value;
    const valor = document.querySelector("input[name='valor_unitario']").value;
    const data_compra = document.querySelector("input[name='data_pedido']").value;

    const res = await fetch("http://127.0.0.1:5000/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ descricao, quantidade, valor, data_compra })
    });

    const data = await res.json();
    alert(data.mensagem || data.error);
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Eventos
document.getElementById("fornecedor-form")?.addEventListener("submit", cadastrarFornecedor);
document.getElementById("produto-form")?.addEventListener("submit", cadastrarProduto);

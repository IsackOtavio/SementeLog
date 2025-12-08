Front End.

# 📜 Explicação das Páginas HTML

Abaixo estão explicadas todas as páginas do seu front.

---

## 🔐 login.html

Página de login do sistema.

- Contém formulário de email/usuário e senha  
- Botão para acessar  
- Validação simples  
- Após login, redireciona para a página principal  

---

## 🏠 BEM-VINDO.HTML

Tela inicial do sistema após o login.

- Exibe mensagem de boas-vindas  
- Mostra atalhos para as principais funções do sistema  
- Serve como “home” do usuário  

---

## 📝 cadastro.html

Página para cadastro geral.

Pode cadastrar:

- Usuários  
- Produtos  
- Ou outros registros (dependendo da lógica do sistema)

Aqui o JavaScript coleta os dados e envia via POST para o backend.

---

## 🧾 compras.html

Área voltada para controle de compras.

- Listagem ou criação de pedidos de compra  
- Campos de valores, fornecedor, itens  
- Integração futura com estoque  

---

## 📥 entrada_mercadoria.html

Página dedicada às **entradas** de produtos no estoque.

Aqui o usuário:

- Seleciona o produto  
- Informa quantidade que está chegando  
- Envia ao backend  
- O estoque é atualizado  

---

## 📦 estoque.html

A página principal do sistema.

Aqui acontece:

- Listagem completa de produtos  
- Busca de produto por ID  
- Botão de editar (abrindo modal com dados)  
- Botão de excluir  
- Integração total com script.js  

O JavaScript faz um **GET /api/estoque** e preenche a tabela.

---

## 📤 saida_mercadoria.html

Página para **registrar saídas** do estoque.

- Seleção do produto  
- Quantidade retirada  
- Motivo da saída  
- Atualização do estoque no backend  

---

## 🧠 auditoria.html

Página usada para fins de auditoria.

- Mostra todos os registros de movimentações  
- Pode listar entradas e saídas  
- Serve para controle interno  

---

## 📊 relatorios.html

Área de relatórios.

- Visualização de resumo do estoque  
- Relatórios de entradas/saídas  
- Possível exportação futura  

---

## 🧭 governança.html

Página institucional para informações de governança.

---

## 📑 licitacao.html

Página voltada a processos de licitação e documentos.

---

## 🚚 logistica.html

Área dedicada à logística e movimentações do sistema.

---

## 🛒 pedido_compra.html

Criação e controle de pedidos de compra.

---

## 📱 Qrcode.html

Página usada para:

- Ler QR Code  
- Exibir informações do produto automaticamente  

---

# ⚙️ script.js — Explicação Didática

Este é o arquivo mais importante do front-end.

Ele é responsável por:

### ✔️ Carregar a lista de produtos  
Faz um GET para `/api/estoque` e preenche a tabela.

### ✔️ Abrir modal de edição  
Quando o usuário clica em "Editar", o JS:

- Busca os dados do produto pelo ID  
- Preenche o formulário  
- Mostra o modal

### ✔️ Salvar produto novo  
Envia os dados do formulário via POST.

### ✔️ Atualizar produto  
Envia um PUT para `/api/estoque/<id>`.

### ✔️ Excluir produto  
Envia DELETE para remover o item.

### ✔️ Fechar e abrir modais  
Controla toda a parte visual de pop-ups.

Sem esse arquivo, o sistema não funciona.

---

# 🎨 style.css — Explicação Didática

Este arquivo controla:

- Cores  
- Fontes  
- Botões  
- Tabelas  
- Inputs  
- Layout geral das páginas  
- Responsividade  
- Estilo dos modais  

Praticamente tudo o que você vê visualmente é definido aqui.

---

# 🔄 Fluxo Completo do Usuário

1. Usuário acessa *login.html*  
2. Após logar, vai para *BEM-VINDO.HTML*  
3. Navega para *estoque.html* (parte principal)  
4. A tabela é carregada via JavaScript  
5. Ele pode:
   - cadastrar  
   - editar  
   - excluir  
   - registrar entrada  
   - registrar saída  
6. A ação é enviada ao backend  
7. Backend responde  
8. Front atualiza a tela automaticamente  

****Back end****


# 📦 API de Gerenciamento de Estoque – Explicação Didática e Completa


Este documento explica, passo a passo, como funciona toda a API de estoque desenvolvida em Flask com MySQL.  
Aqui você encontra **tudo em um único arquivo**, sem separações complicadas e sem códigos.  
O foco é **entender**, não decorar.

---

# 🎯 O que essa API faz?

Ela é responsável por **controlar um estoque**.  
Com ela, você consegue:

- Adicionar produtos  
- Listar todos os produtos  
- Atualizar um produto  
- Excluir um produto  
- Buscar um produto pelo seu ID  

Tudo isso usando requisições HTTP no formato **REST** e respostas em **JSON**, que é o formato mais comum para conseguir conversar com frontends.

---

# 🧠 Como a API pensa?

Pode imaginar assim:

1. O frontend faz uma pergunta para a API  
2. A API escuta essa pergunta  
3. Entra no banco de dados MySQL  
4. Pega ou atualiza as informações necessárias  
5. Devolve uma resposta organizada em JSON  

É como um “garçom” entre o cliente e a cozinha.

---

# 🗃 Estrutura interna da API

A API é organizada em torno de **rotas**.  
Cada rota é um caminho da URL que ativa uma função diferente.

Por exemplo:

- `/api/estoque` → lista ou adiciona produtos  
- `/api/estoque/<id>` → pega, atualiza ou exclui um produto usando seu ID  

É como se cada endereço representasse uma ação.

---

# 🔑 Como a API conversa com o banco

Antes de qualquer rota funcionar, existe uma “ponte” que reconecta a API ao MySQL sempre que necessário.  
Essa ponte:

1. Usa o host (endereço do servidor do banco)  
2. Usa usuário e senha  
3. Acessa o banco chamado `semente_log`  

Sempre que a API precisa de informação, ela abre essa ponte, faz o que precisa, e depois fecha de novo.  
Isso evita travamentos e mantém tudo seguro.

---

# 📌 Explicação das Funcionalidades

Vamos agora explicar cada funcionalidade da API de forma simples.

---

## 🟦 1. Listar produtos

**Quando o usuário quer ver todos os produtos do estoque**, ele usa a rota de listagem.

O que acontece por trás:

1. A API abre a conexão com o banco  
2. Busca todos os produtos cadastrados  
3. Organiza tudo como uma lista de objetos  
4. Envia isso em formato JSON para o frontend  

Se o banco der erro, a API responde com um JSON explicando o problema.

📌 *Para que serve?*  
Permite ao frontend exibir a tabela completa de produtos.

---

## 🟩 2. Adicionar um novo produto

Quando o frontend envia nome, código e quantidade de um produto, a API:

1. Lê os dados enviados  
2. Conecta ao banco  
3. Insere um novo registro na tabela  
4. Finaliza a conexão  
5. Envia uma mensagem dizendo que deu tudo certo  

📌 *Para que serve?*  
Permite cadastrar novos itens no estoque.

Se o frontend enviar dados incorretos ou o banco falhar, a API devolve uma mensagem de erro.

---

## 🟧 3. Atualizar um produto existente

Quando o frontend quer editar um produto, ele envia o ID do produto e os novos dados.  
A API:

1. Lê os dados enviados  
2. Conecta ao banco  
3. Substitui os dados antigos pelos novos  
4. Confirma a atualização  
5. Envia uma mensagem de sucesso  

📌 *Para que serve?*  
Corrigir informações ou mudar quantidade disponível.

Se o ID não existir, a API não acha o produto, e responde com erro.

---

## 🟥 4. Excluir produto

Exclusão funciona assim:

1. O frontend envia o ID do produto a ser excluído  
2. A API vai ao banco  
3. Remove o registro  
4. Confirma a exclusão  
5. Envia uma mensagem dizendo que foi apagado  

📌 *Para que serve?*  
Remover produtos que não fazem mais parte do estoque.

Se o ID não existe, nada é removido e um erro é enviado.

---

## 🟨 5. Buscar produto pelo ID

Aqui o processo é bem direto:

1. O frontend envia o número do ID  
2. A API procura exatamente aquele item no banco  
3. Se achar, devolve os dados em JSON  
4. Se não achar, devolve `null`  

📌 *Para que serve?*  
Preencher automaticamente um formulário de edição, por exemplo.

---

# 🧩 Como tudo funciona junto?

A API segue sempre esse ciclo:

1. **Recebe a requisição** (ex: listar produtos)  
2. **Abre conexão com MySQL**  
3. **Executa o comando necessário** (buscar, inserir, atualizar, excluir)  
4. **Fecha a conexão**  
5. **Devolve uma resposta em JSON**  

É esse ciclo que deixa a API consistente e previsível.

---

# 🏗 Estrutura esperada no banco

O banco `semente_log` deve ter uma tabela com estas colunas:

- `id` → número único do produto  
- `produto` → nome do item  
- `codigo` → código de identificação  
- `quantidade` → quantidade no estoque  

A API foi toda construída pensando exatamente nessa estrutura.

---

# 🚀 Como rodar o backend

1. Você instala Flask, CORS e MySQL Connector  
2. Cria o banco e a tabela no MySQL  
3. Ajusta usuário e senha, se necessário  
4. Executa o arquivo principal  
5. Pronto! O frontend já pode conversar com a API  

---

# 🧭 Por que essa API é didática?

Porque ela usa:

- Estrutura simples  
- Conexão clara com MySQL  
- Código direto e entendível  
- Rotas REST padronizadas  
- Respostas em JSON  
- Funções bem separadas por responsabilidade  

Ideal tanto para estudos quanto para projetos reais.

---

# 🎉 Conclusão

Aqui você tem, **em um único documento**, toda explicação detalhada e didática de como o backend funciona:

- O que ele faz  
- Como ele pensa  
- Como ele fala com o banco  
- Para que serve cada funcionalidade  
- Como tudo se conecta  

Esse README serve como manual completo do backend.




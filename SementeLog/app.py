from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)
CORS(app)

# Configuração do banco
db_config = {
    'host': '127.0.0.1',
    'user': 'root',
    'password': 'root',
    'database': 'semente_log'
}

# Inicializa banco e tabela
def init_db():
    try:
        # Conecta no MySQL sem selecionar banco
        conn = mysql.connector.connect(
            host=db_config['host'],
            user=db_config['user'],
            password=db_config['password']
        )
        cursor = conn.cursor()
        cursor.execute("CREATE DATABASE IF NOT EXISTS semente_log")
        conn.close()

        # Conecta no banco criado
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS produtos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                produto VARCHAR(255) NOT NULL,
                codigo VARCHAR(100) NOT NULL,
                quantidade INT NOT NULL
            )
        """)
        conn.commit()
        conn.close()
        print("Banco e tabela inicializados com sucesso!")
    except Error as e:
        print("Erro ao inicializar banco:", e)

init_db()

# Função de conexão
def get_db_connection():
    return mysql.connector.connect(**db_config)

# --- ROTAS CRUD ---

# Listar produtos
@app.route('/api/estoque', methods=['GET'])
def listar_produtos():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM produtos ORDER BY id DESC")
        produtos = cursor.fetchall()
        conn.close()
        return jsonify(produtos)
    except Error as e:
        return jsonify({"error": str(e)}), 500

# Adicionar produto
@app.route('/api/estoque', methods=['POST'])
def adicionar_produto():
    try:
        data = request.json
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO produtos (produto, codigo, quantidade) VALUES (%s, %s, %s)",
            (data['produto'], data['codigo'], data['quantidade'])
        )
        conn.commit()
        conn.close()
        return jsonify({"message": "Produto adicionado com sucesso"}), 201
    except Error as e:
        print("Erro ao adicionar produto:", e)
        return jsonify({"error": "Erro ao adicionar produto"}), 500

# Atualizar produto
@app.route('/api/estoque/<int:id>', methods=['PUT'])
def atualizar_produto(id):
    try:
        data = request.json
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            "UPDATE produtos SET produto=%s, codigo=%s, quantidade=%s WHERE id=%s",
            (data['produto'], data['codigo'], data['quantidade'], id)
        )
        conn.commit()
        conn.close()
        return jsonify({"message": "Produto atualizado com sucesso"})
    except Error as e:
        print("Erro ao atualizar produto:", e)
        return jsonify({"error": "Erro ao atualizar produto"}), 500

# Excluir produto
@app.route('/api/estoque/<int:id>', methods=['DELETE'])
def excluir_produto(id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM produtos WHERE id=%s", (id,))
        conn.commit()
        conn.close()
        return jsonify({"message": "Produto excluído com sucesso"})
    except Error as e:
        print("Erro ao excluir produto:", e)
        return jsonify({"error": "Erro ao excluir produto"}), 500

# Buscar produto por ID
@app.route('/api/estoque/<int:id>', methods=['GET'])
def buscar_produto(id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM produtos WHERE id=%s", (id,))
        produto = cursor.fetchone()
        conn.close()
        return jsonify(produto)
    except Error as e:
        print("Erro ao buscar produto:", e)
        return jsonify({"error": "Erro ao buscar produto"}), 500

if __name__ == '__main__':
    app.run(debug=True)

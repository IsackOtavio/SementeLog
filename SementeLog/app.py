from flask import Flask, render_template, redirect, url_for

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('BEM-VINDO.HTML')

@app.route('/auditoria')
def auditoria():
    return render_template('auditoria.html')

@app.route('/cadastro')
def cadastro():
    return render_template('cadastro.html')

@app.route('/compras')
def compras():
    return render_template('compras.html')

@app.route('/entrada_mercadoria')
def entrada_mercadoria():
    return render_template('entrada_mercadoria.html')

@app.route('/estoque')
def estoque():
    return render_template('estoque.html')

@app.route('/governaca')
def governaca():
    return render_template('governaça.html')

@app.route('/licitacao')
def licitacao():
    return render_template('licitacao.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/logistica')
def logistica():
    return render_template('logistica.html')

@app.route('/pedido_compra')
def pedido_compra():
    return render_template('pedido_compra.html')

@app.route('/qrcode')
def qrcode():
    return render_template('Qrcode.html')

@app.route('/relatorios')
def relatorios():
    return render_template('relatorios.html')

@app.route('/saida_mercadoria')
def saida_mercadoria():
    return render_template('saida_mercadoria.html')

@app.route('/transparencia')
def transparencia():
    return render_template('Transparencia.html')

if __name__ == '__main__':
    app.run(debug=True)
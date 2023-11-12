document.addEventListener('DOMContentLoaded', function () {
    const app = Vue.createApp({
        data() {
            const dataAtual = new Date();
            const dia = dataAtual.getDate();
            const mes = dataAtual.getMonth() + 1;
            const ano = dataAtual.getFullYear();

            return {
                produtos: [], // Lista de produtos
                newProduto: {
                    id: 0,
                    nome: '',
                    valor: '',
                    quantidadeEstoque: '',
                    dataCadastro: `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`,
                },
                produtoSelecionado: null,
            };
        }
        ,
        created() {
            this.buscarProdutos();
        },
        methods: {
            async buscarProdutos() {
                try {
                    const response = await fetch('http://localhost:3400/produtos', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': '8f8c5397ab71941d3c657247f3ea684f',
                        },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        this.produtos = data.map(produto => {
                            produto.valor = parseFloat(produto.valor).toFixed(2);
                            return produto;
                        });
                    } else {
                        console.error('Erro ao buscar produtos da API');
                    }
                } catch (error) {
                    console.error('Erro ao buscar produtos da API: ', error);
                }
            },
            async addProduto() {
                try {
                    const response = await fetch('http://localhost:3400/produtos', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': '8846b88fa80d2e6f03637d20c01fc33a',
                        },
                        body: JSON.stringify(this.newProduto),
                    });
                    if (response.ok) {
                        this.buscarProdutos();
                        this.newProduto = { nome: '', valor: '', quantidadeEstoque: '', dataCadastro: '' };
                    } else {
                        console.error('Erro ao adicionar um produto');
                    }
                } catch (error) {
                    console.error('Erro ao adicionar um produto: ', error);
                }
            },
            visualizarProduto(produto) {
                try {
                    this.produtoSelecionado = produto;
                    var modal = document.getElementById("modall");
                    if (modal) {
                        modal.style.display = "flex";
                    }
                } catch (error){console.log('Algo deu errado!')}
            },
            fecharModal() {
                var modal = document.getElementById("modall");
                modal.style.display = "none";
            },
            fecharModal2() {
                var modal = document.getElementById("modal2");
                modal.style.display = "none";
            },
            editarProduto(produto) {
                try {
                    this.produtoSelecionado = produto;
                    var modal2 = document.getElementById("modal2");
                    if (modal2) {
                    modal2.style.display = "flex";
                }
                } catch (error) {
                    console.error('Erro ao acessar Elemento');
                }
                
                    
            },

            confirmaEdicao(produto) {
                try {
                    const url = `http://localhost:3400/produtos/${produto.id}`;
                    console.log(produto.id)
                    fetch(url, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': '8f8c5397ab71941d3c657247f3ea684f',
                        },
                        body: JSON.stringify(produto),
                    })
                        .then(response => {
                            if (response.ok) {
                                this.produtoSelecionado = produto;
                                var modal = document.getElementById("modal2");
                                modal.style.display = "none";
                            } else {
                                console.error('Erro ao editar o produto');
                            }
                        })
                        .catch(error => {
                            console.error('Erro ao editar o produto: ', error);
                        });
                } catch (error) {
                    console.error('Erro ao editar o produto: ', error);
                }
            },
            

        async deletarProduto(produto) {
            try {
                const confirmarExclusao = confirm('Tem certeza de que deseja excluir este Produto?');
                if(confirmarExclusao){
                    const response = await fetch(`http://localhost:3400/produtos/${produto.id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': '8846b88fa80d2e6f03637d20c01fc33a',
                        },
                    });

                    if (response.ok) {
                        this.buscarProdutos();
                    } else {
                        console.error('Erro ao deletar o produto');
                    }
                }
            } catch (error) {
                console.error('Erro ao deletar o produto: ', error);
            }
        },

        cancelarAcao() {
            this.produtoSelecionado = null;
        },
    },
    });

app.mount('#app');
});
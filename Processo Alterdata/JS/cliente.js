document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'http://localhost:3400/clientes'; // URL da API de clientes

    const app = Vue.createApp({
        data() {
            const dataAtual = new Date();
            const dia = dataAtual.getDate();
            const mes = dataAtual.getMonth() + 1;
            const ano = dataAtual.getFullYear();

            return {
                clientes: [], // Lista de clientes
                newCliente: {
                    nome: '',
                    cpfOuCnpj: '',
                    email: '',
                    telefone: '',
                    idUsuario: 1,
                    dataCadastro: `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`,
                },
                clienteSelecionado: null
            };
        },
        created() {
            this.buscarClientes();
        },
        methods: {
            async buscarClientes() {
                try {
                    const response = await fetch(apiUrl, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': '29e0e91d897e358054d44872170a8699',
                        },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        this.clientes = data;
                    } else {
                        console.error('Erro ao buscar clientes da API');
                    }
                } catch (error) {
                    console.error('Erro ao buscar clientes da API: ', error);
                }
            },
            async addCliente() {
                try {
                    
                    // Enviar o novo cliente para a API de clientes
                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': '29e0e91d897e358054d44872170a8699',
                        },
                        body: JSON.stringify(this.newCliente),
                    });

                    if (response.ok) {
                        this.buscarClientes();
                        this.newCliente = { nome: '', cpfOuCnpj: '', email: '', telefone: '', idUsuario: 1, dataCadastro: '' };
                    } else {
                        console.error('Erro ao adicionar um cliente');
                    }
                } catch (error) {
                    console.error('Erro ao adicionar um cliente: ', error);
                }
            },
            visualizarCliente(cliente) {
                try {
                    this.clienteSelecionado = cliente;
                    var modal = document.getElementById("modall");
                    if (modal) {
                        modal.style.display = "flex";
                    }
                } catch (error) {
                    console.log('Algo deu errado!');
                }
            },
            fecharModal() {
                var modal = document.getElementById("modall");
                modal.style.display = "none";
            },
            editarCliente(cliente) {
                try {
                    this.clienteSelecionado = cliente;
                    var modal2 = document.getElementById("modal2");
                    if (modal2) {
                        modal2.style.display = "flex";
                    }
                } catch (error) {
                    console.error('Erro ao acessar Elemento');
                }
            },
            fecharModal2() {
                var modal = document.getElementById("modal2");
                modal.style.display = "none";
            },

            confirmaEdicao(cliente) {
                try {
                    const url = `${apiUrl}/${cliente.id}`;
                    fetch(url, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': '29e0e91d897e358054d44872170a8699',
                        },
                        body: JSON.stringify(cliente),
                    })
                        .then(response => {
                            if (response.ok) {
                                this.clienteSelecionado = cliente;
                                var modal = document.getElementById("modal2");
                                modal.style.display = "none";
                            } else {
                                console.error('Erro ao editar o cliente');
                            }
                        })
                        .catch(error => {
                            console.error('Erro ao editar o cliente: ', error);
                        });
                } catch (error) {
                    console.error('Erro ao editar o cliente: ', error);
                }
            },

            async deletarCliente(cliente) {
                try {
                    const confirmarExclusao = confirm('Tem certeza de que deseja excluir este cliente?');
                    if (confirmarExclusao) {
                        const response = await fetch(`${apiUrl}/${cliente.id}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': '29e0e91d897e358054d44872170a8699'
                            }
                        });
                        if (response.ok) {
                            this.buscarClientes();
                        } else {
                            console.error('Erro ao deletar o cliente');
                        }
                    }
                } catch (error) {
                    console.error('Erro ao deletar o cliente: ', error);
                }
            },
        },
    });

    app.mount('#app');
});

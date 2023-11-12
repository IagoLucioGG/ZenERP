const app = Vue.createApp({
    data() {
        return {
            produtos: [], // Sua lista de produtos
            produtoComMaiorQuantidade: null,
            quantidadeTotalProdutos: 0,
            clientes: [], // Sua lista de clientes
            quantidadeTotalClientes: 0,
        };
    },
    created() {
        this.buscarProdutos();
        this.buscarClientes();
    },
    methods: {
        async buscarProdutos() {
            try {
                console.log('Iniciando busca de produtos...');
                const response = await fetch('http://localhost:3400/produtos', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': '8f8c5397ab71941d3c657247f3ea684f',
                    },
                });
                if (response.ok) {
                    console.log('Dados da API obtidos com sucesso.');
                    const data = await response.json();
                    this.produtos = data.map(produto => {
                        produto.valor = parseFloat(produto.valor).toFixed(2);
                        return produto;
                    });
                    
                    
                    this.produtosComMaiorQuantidade = this.produtos
                    .sort((produtoA, produtoB) => produtoB.quantidadeEstoque - produtoA.quantidadeEstoque)
                    .slice(0, 10);
                    ;

                    
                    if(this.produtos.length > 0){
                        this.quantidadeTotalProdutos = this.produtos.length;
                    } else this.quantidadeTotalProdutos= '0'
                    
                } else {
                    console.error('Erro ao buscar produtos da API');
                }
            } catch (error) {
                console.error('Erro ao buscar produtos da API: ', error);
            }
            
        },
        async buscarClientes() {
            try {
                const response = await fetch('http://localhost:3400/clientes', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': '29e0e91d897e358054d44872170a8699',
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    this.clientes = data;
                    if(this.clientes.length > 0){
                        this.quantidadeTotalClientes = this.clientes.length;
                    } else this.quantidadeTotalClientes = '0'
                } else {
                    console.error('Erro ao buscar clientes da API');
                }
            } catch (error) {
                console.error('Erro ao buscar clientes da API: ', error);
            }
        }
    }
    ,
});

app.mount('#app');

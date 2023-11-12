const app = Vue.createApp({
    data() {
        return {
            username: '',
            password: '',
            loginMessage: ''
        };
    },
    methods: {
        async login() {
            
            // Lógica de login aqui
            const username = this.username;
            const password = this.password;

            try {

                // Enviar uma solicitação POST para a função de validação do usuário no servidor
                const response = await fetch('http://localhost:3400/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        
                    },
                    body: JSON.stringify({
                        email: username,
                        senha: password,
                    }),
                });

                if (response.status === 200) {

                    // A resposta do servidor foi bem-sucedida, você pode continuar
                    const data = await response.json();
                    console.log('Usuário válido:', data);
                    this.loginMessage = 'Login bem-sucedido!';

                    // Redirecione para outra página HTML após o login bem-sucedido
                    window.location.href = '/HTML/dash.html';
                } else {

                    // A resposta do servidor indica que o login falhou
                    console.log('Falha ao validar usuário. Código de status:', response.status);
                    this.loginMessage = 'Email de usuário ou senha incorretos.';
                }
            } catch (error) {
                console.error('Erro ao validar usuário:', error);
                this.loginMessage = 'Erro ao validar usuário.';
            }
        }
    }
});

app.mount('#app');


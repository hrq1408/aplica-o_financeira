# Aplicação Banco (em desenvolvimento)

Este projeto é uma aplicação web em React para consultar o saldo da conta e faça transferencia em pix.A aplicação permitirá aos usuários visualizar seu saldo, filtrar e ordenar as informações, além de acessar outras funcionalidades relacionadas à sua conta.

## Funcionalidades (em desenvolvimento):

### Autenticação:
- Login e registro de usuários.
- Proteção de rotas que exigem autenticação.

### Página Inicial (Dashboard):
- Mensagem de boas-vindas personalizada com o nome do usuário.
- Exibição do saldo total de dividendos recebidos no ano.

### Pagina de filtro de transações (Dashboard):
- Ordenação dos lançamentos por data, tipo, data inicial a final, valor minimo, data.
- Detalhes de cada lançamento, incluindo informações específicas para TED e PIX.

### Realizar Transações:
- Formulário para inserir dados da transação (CPF, nome do favorecido, banco, agência, conta, chave PIX, valor e data).
- Resumo da transação para confirmação antes do envio.
- Integração com API para registro da transação e atualização do saldo (em desenvolvimento).

## Tecnologias Utilizadas:
- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **React Router**: Gerenciamento de rotas na aplicação.
- **Axios**: Realização de requisições HTTP para a API (ou API mock).
- **JSON Server** (opcional): Criação de uma API mock para desenvolvimento e testes.
- **Redux Toolkit** (opcional): Gerenciamento de estado global da aplicação.
- **CSS Modules**: Estilização da aplicação.
- **Jest e React Testing Library**: Testes unitários e de integração.

## Estrutura do Projeto:
A estrutura de pastas segue os princípios do SOLID, promovendo a separação de responsabilidades e a modularidade do código.



- **src/api**: Lógica de comunicação com a API (ou API mock).
- **src/assets**: Imagens, ícones, fontes, etc.
- **src/components**: Componentes reutilizáveis da UI.
  - **ui**: Componentes puramente visuais.
  - **containers**: Componentes que conectam a UI com a lógica e o estado.
  - **features**: Componentes específicos para cada funcionalidade.
- **src/context** ou **src/redux**: Gerenciamento de estado global.
- **src/hooks**: Hooks customizados.
- **src/pages**: Páginas principais da aplicação.
- **src/routes**: Configuração de rotas.
- **src/services**: Lógica de negócio e funções auxiliares.
- **src/styles**: Arquivos de estilo CSS.
- **src/utils**: Funções auxiliares genéricas.
- **src/App.jsx**: Componente principal da aplicação.
- **src/index.jsx**: Ponto de entrada da aplicação.

## Como Executar o Projeto:

### Clonar o repositório:
```bash
git clone https://github.com/hrq1408/aplica-o_financeira

### Instalar depenências 
Instalar as dependências:

cd seu_repositorio
npm install
# ou
yarn install

### Iniciar a API mock:
npm json-server --watch db.json --port 3001

### Iniciar o projeto
npm start
# ou
yarn start

### Acessar a aplicação:
Abra o navegador e acesse http://localhost:3000.
 
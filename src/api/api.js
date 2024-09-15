import axios from 'axios';

const api_banco = 'http://localhost:3001';

export const featchBancoUsuarios = () => {
    return axios.get(`${api_banco}/usuarios`);
}

export const featchBancoTransacoes = () => {
    return axios.get(`${api_banco}/transacoes`);
}

export const featchBancoTransacoesUnico = (id) => {
    return axios.get(`${api_banco}/transacoes/${id}`);
}



export const featchBancoTransacoesFiltro = (filtrados) => {
    let queryString = '';
    if (filtrados.tipo) {
        queryString += `tipo=${filtrados.tipo}&`;
    }
    if (filtrados.valorMin) {
        queryString += `valorMin=${filtrados.valorMin}&`;
    }
    if (filtrados.valorMax) {
        queryString += `valorMax=${filtrados.valorMax}&`;
    }
    if (filtrados.dataInicio) {
        queryString += `dataInicio=${filtrados.dataInicio}&`;
    }
    if (filtrados.dataFim) {
        queryString += `dataFim=${filtrados.dataFim}&`;
    }
    if (filtrados.usuario) {
        queryString += `usuario=${filtrados.usuario}&`;
    }
    return axios.get(`${api_banco}/transacoes?${queryString}`);
}
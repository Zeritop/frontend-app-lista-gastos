const validarUsuario = () => {
    let headers = {};

    if(localStorage.getItem('token')){
        const token = localStorage.getItem('token');
        headers = { 'auth-token': `Bearer ${token}` };
    }

    return headers;
}

export default validarUsuario;
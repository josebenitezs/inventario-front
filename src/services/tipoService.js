import {axiosInstance} from '../helpers/axios-config';

const getTipoEquipos = () => {
    return axiosInstance.get('tipo-equipo', {

        headers: {
            'Content-type': 'application/json'
        }
    });
}

const crearTipoEquipo = (data) => {
    return axiosInstance.post('tipo-equipo', data, {
        header:{
            'Content-type': 'application/json'
        }
    });
}

const editTipoEquipo = (tipoEquipoId, data) => {
    return axiosInstance.put(`tipo-equipo/${tipoEquipoId}`, data, {
        header:{
            'Content-type': 'application/json'
        }
    });
}

const getTipoPorId = (tipoEquipoId) => {
    return axiosInstance.get(`tipo-equipo/${tipoEquipoId}`, {

        headers: {
            'Content-type': 'application/json'
        }
    });
}


export {    
    getTipoEquipos, crearTipoEquipo, editTipoEquipo, getTipoPorId
}
import {axiosInstance} from '../helpers/axios-config';

const getEstadoEquipos = () => {
    return axiosInstance.get('estado-equipo', {

        headers: {
            'Content-type': 'application/json'
        }
    });
}

const crearEstadoEquipo = (data) => {
    return axiosInstance.post('estado-equipo', data, {
        header:{
            'Content-type': 'application/json'
        }
    });
}

const editEstadoEquipo = (estadoEquipoId, data) => {
    return axiosInstance.put(`estado-equipo/${estadoEquipoId}`, data, {
        header:{
            'Content-type': 'application/json'
        }
    });
}

const getEstadoPorId = (estadoEquipoId) => {
    return axiosInstance.get(`estado-equipo/${estadoEquipoId}`, {

        headers: {
            'Content-type': 'application/json'
        }
    });
}
export {    
    getEstadoEquipos, crearEstadoEquipo, editEstadoEquipo, getEstadoPorId
}
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getMarcaPorId, editMarca } from '../../services/marcaService';
import { getMarcas } from '../../services/marcaService';
import Swal from "sweetalert2";


export const MarcaUpdate = () => {

    const { marcaId = '' } = useParams();
    const [marca, setMarcas] = useState();
    const [valoresForm, setValoresForm] = useState([]);
    const { nombre = '', estado = '' } = valoresForm;

    const listarMarcas = async () => {
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            const resp = await getMarcas();
            setMarcas(resp.data);
            Swal.close();
        } catch (error) {
            console.log(error);
            Swal.close();
        }
    }

    useEffect(() => {
        listarMarcas();
    }, []);



    const getMarca = async () => {
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const { data } = await getMarcaPorId(marcaId);
            console.log(data);
            setMarcas(data);
            Swal.close();
        } catch (error) {
            console.log();
            Swal.close();
        }
    }

    useEffect(() => {
        getMarca();
    }, [marcaId]);

    useEffect(() => {
        if (marca) {
            setValoresForm({
                nombre: marca.nombre,
                estado: marca.estado,
            });
        }
    }, [marca])

    const handleOnChange = (e) => {
        setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
    }



    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const marca = {
            nombre, estado,

        }
        console.log(marca);
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const { data } = await editMarca(marcaId, marca);
            Swal.close();
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            Swal.close();
            let mensaje;
            if (error && error.response && error.response.data) {
                mensaje = error.response.data;
            } else {
                mensaje = 'Ocurrio un error, por favor intente de nuevo '
            }
            Swal.fire('Error', 'Ocurrió un error, po favor verifique los datos', 'error');
        }
    }



    return (
        <div className='container-fluit mt-3 mb-2'>
            <div className="card">
                <div className='card-header'>
                    <h5 className='sidebar-header'>Editar Marca</h5>

                </div>
                <div className='container-fluid'>
                    <form onSubmit={(e) => handleOnSubmit(e)}>
                        <div className='row'>
                            <div className='col-lg-4'>
                                <div className="mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input required name='nombre' value={nombre} type="text" className="form-control"
                                        onChange={(e) => handleOnChange(e)} />
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="mb-12">
                                    <label className="form-label">Estado</label>
                                    <select required name='estado' key={estado} value={estado} className="form-select" onChange={(e) => handleOnChange(e)} >
                                        <option >-- SELECCIONE--</option>
                                        <option value="Activo">Activo</option>
                                        <option value="Inactivo">Inactivo</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-primary"> Guardar </button>
                    </form>

                </div>
            </div>
        </div>
    )
}


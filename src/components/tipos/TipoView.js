import React, { useState, useEffect } from 'react'
import { getTipoEquipos, crearTipoEquipo } from '../../services/tipoService'
import Swal from 'sweetalert2';
import { Link} from 'react-router-dom';

const moment = require('moment');

export const TipoView = () => {

  const [valoresForm, setValoresForm] = useState({});
  const [tipos, setTipos] = useState([]);
  const { nombre = '', estado = '' } = valoresForm;

  const listarTipos= async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      const resp = await getTipoEquipos();
      setTipos(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();      
    }
  }

  useEffect(()=>{
    listarTipos();
  },[]);

  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
  }

  const handleCrearTipo = async (e) => {
    e.preventDefault();
    console.log(valoresForm);
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const resp = await crearTipoEquipo(valoresForm);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  

  return (
    <div className='container-fluid'>
      <form onSubmit={(e) => handleCrearTipo()}>
        <div className="row">
          <div className="col-lg-8">
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input required name='nombre' value={nombre}  type="text" className="form-control"
                onChange={(e) => handleOnChange(e)} />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="mb-3">
              <label className="form-label">Estado</label>
              <select required name='estado' value={estado} className="form-select"
               onChange={(e) => handleOnChange(e)} >
                <option >-- SELECCIONE--</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
          </div>
        </div>
        <button className="btn btn-primary"> Guardar </button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th scope='row'>#</th>
            <th scope='col'>Nombre</th>
            <th scope='col'>Estado</th>
            <th scope='col'>Fecha Creacion</th>
            <th scope='col'>Fecha Actualizacion</th>
            <th scope='col'>Actualizar</th>
          </tr>
        </thead>
        <tbody>
          {
           tipos.length > 0 && tipos.map((tipoEquipo, index) => {
              return <tr>
                <th scope='row'>{index + 1}</th>
                <td>{tipoEquipo.nombre}</td>
                <td>{tipoEquipo.estado}</td>
                <td>{moment(tipoEquipo.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
                <td>{moment(tipoEquipo.fechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
                <th scope='row'>
                <button type="button" className="btn btn-primari">
                <Link to = {`tipoEquipo/edit/${tipoEquipo._id}`}>Editar</Link>
                </button>


                </th>
              </tr>
            })
          }
        </tbody>

      </table>
    </div>
  )
}

import React, {useState, useEffect } from 'react'
import { getEstadoEquipos, crearEstadoEquipo } from '../../services/estadoService';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const moment = require('moment');

export const EstadoView = () => {
  
  const [ valoresForm, setValoresForm ] = useState([]);
  const [ estadoEquipo, setEquipos ]= useState([]);
  const {nombre = '', estado =''} = valoresForm;


  const listarEstados = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      const resp = await getEstadoEquipos();
      setEquipos(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();      
    }
  }

  useEffect(()=>{
    listarEstados();
  },[]);

  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value});
  }

  const handleCrearEstado = async (e)=> {
    e.preventDefault();
    console.log(valoresForm);
    try{
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const resp = await crearEstadoEquipo(valoresForm);

      Swal.close();
    } catch(error){
      console.log(error);
      Swal.close();

    }
  }

  return (
    <div className='container-fluid'>
      <form onSubmit={(e) => handleCrearEstado(e)}>
        <div className='row'>
          <div className='col-lg-8'>
          <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input required name='nombre' value={nombre} type="text" className="form-control"
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
            estadoEquipo.length > 0 && estadoEquipo.map((estadoEquipo, index) => {
              return <tr>
                <th scope='row'>{index + 1}</th>
                <td>{estadoEquipo.nombre}</td>
                <td>{estadoEquipo.estado}</td>
                <td>{moment(estadoEquipo.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
                <td>{moment(estadoEquipo.fechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
                <th scope='row'>
                <button type="button" className="btn btn-primari">
                <Link to = {`estadoEquipo/edit/${estadoEquipo._id}`}>Editar</Link>
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
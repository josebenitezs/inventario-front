import React, { useState, useEffect } from 'react'
import {useParams } from 'react-router-dom';
import {getUsuarioPorId, editUsuario } from '../../services/usuarioService';
import { getUsuarios } from '../../services/usuarioService';
import Swal from "sweetalert2";


export const UsuarioUpdate = () => {

    const{ usuarioId = '' } = useParams();
    const [ usuario, setUsuarios ] = useState();
    const [ valoresForm, setValoresForm ]= useState([]);
    const {nombre = '', email = '', estado =''} = valoresForm;

    const listarUsuarios = async () => {
        try {
          Swal.fire({
            allowOutsideClick: false,
            text: 'Cargando...'
          });
          const resp = await getUsuarios();
          setUsuarios(resp.data);
          Swal.close();
        } catch (error) {
          console.log(error);
          Swal.close();      
        }
      }
    
      useEffect(()=>{
        listarUsuarios();
      },[]);
    


    const getUsuario = async () =>{
        try{
            Swal.fire({
                allowOutsideClick:false,
                text: 'Cargando...'
              });
              Swal.showLoading();
            const { data }= await getUsuarioPorId(usuarioId);
            console.log(data);
            setUsuarios(data);
            Swal.close();  
        }catch (error) {
            console.log();
            Swal.close();  
        }
    }

    useEffect(() => {
        getUsuario();
    }, [usuarioId]);

    useEffect(() => {
        if(usuario){
            setValoresForm({
                nombre: usuario.nombre,
                email: usuario.email,
                estado: usuario.estado,
            });
        }
    }, [ usuario ])

    const handleOnChange = (e) => {
        setValoresForm({ ...valoresForm, [e.target.name]: e.target.value});
      }



      const handleOnSubmit= async (e)=> {
        e.preventDefault();
        const usuario = {
          nombre, email, estado,   
  
        }
        console.log(usuario);
        try {
          Swal.fire({
            allowOutsideClick:false,
            text: 'Cargando...'
          });
          Swal.showLoading();        
         const { data } = await editUsuario(usuarioId, usuario);
         Swal.close();              
        } catch (error) {
          console.log(error);
          console.log(error.response.data);
          Swal.close();
          let mensaje;
          if(error && error.response && error.response.data) {
              mensaje= error.response.data;
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
                <h5 className='sidebar-header'>Editar Usuario</h5>
                
            </div>
            <div className='container-fluid'>
            <form onSubmit={(e)=> handleOnSubmit(e)}>
        <div className='row'>
          <div className='col-lg-4'>
          <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input required name='nombre' value={nombre} type="text" className="form-control"
                onChange={(e) => handleOnChange(e)} />
            </div>
          </div>
          <div className='col-lg-4'>
          <div className="mb-3">
              <label className="form-label">Email</label>
              <input required name='email' value={email} type="email" className="form-control"
                onChange={(e) => handleOnChange(e)} />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="mb-4">
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

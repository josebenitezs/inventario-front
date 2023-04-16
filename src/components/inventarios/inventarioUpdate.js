import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { getInventarioPorId, editInventario } from '../../services/inventarioService';
import { getEstadoEquipos } from '../../services/estadoService';
import { getMarcas } from '../../services/marcaService';
import { getTipoEquipos } from '../../services/tipoService';
import { getUsuarios } from '../../services/usuarioService';
import Swal from "sweetalert2";


export const InventarioUpdate = () => {

    const { inventarioId = '' } = useParams();
    const [ inventario, setInventario ] = useState();
    const [ usuarios, setUsuarios] = useState([]);
    const [ marcas, setMarcas] = useState([]);    
    const [ tipos, setTipos] = useState([]);
    const [ estados, setEstados] = useState([]);
    const [ valoresForm, setValoresForm ] = useState([]);  

    const { serial= '', modelo = '', descripcion = '', color = '', foto = '',
    fechaCompra = '', precio = '', usuario, marca, tipo, estado} = valoresForm;

  
    
   const listarUsuarios= async() => {  
       try {
       const { data } = await getUsuarios();
       setUsuarios(data);
     } catch (error) {
       console.log (error);
     }
   }
   useEffect( () => {
     listarUsuarios();    
   },[]);
 

  const listarMarcas = async () =>{
      try {
       const { data } = await getMarcas();
       setMarcas(data);
     } catch (error) {
       console.log (error);
     }
   }

   useEffect( () => {
     listarMarcas();     
   },[]);

   const listarTipos = async () =>{
     try {
           const { data } = await getTipoEquipos();
           setTipos(data);
         } catch (error) {
           console.log (error);
         }
       }

   useEffect( () => {
     listarTipos();
   
   },[]);

   const listarEstados = async() => {
      try {
       const { data } = await getEstadoEquipos();
       setEstados(data);
     } catch (error) {
       console.log (error);
     }
   }

   useEffect( () => {
    listarEstados();
   },[]);

    const getInventario = async () => {
        try {
            Swal.fire({
                allowOutsideClick:false,
                text: 'Cargando...'
              });
            Swal.showLoading();
            const { data } = await getInventarioPorId(inventarioId);
            console.log(data);
            setInventario(data);
            Swal.close();
        } catch (error) {
            console.log();
            Swal.close();
        }
    }
    

    useEffect(() => {
        getInventario();
    }, [inventarioId]);

    useEffect(() => {
        if(inventario) {
            setValoresForm({
                serial:inventario.serial,
                modelo: inventario.modelo,
                descripcion: inventario.descripcion,                
                color: inventario.color,
                foto: inventario.foto,
                fechaCompra: inventario.fechaCompra,
                precio: inventario.precio,
                usuario:inventario.usuario,
                marca: inventario.marca,
                tipo: inventario.tipoEquipo,
                estado: inventario.estadoEquipo,

            });
        }
    }, [inventario])

    const handleOnChange = ({ target })=>{
        const { name, value } = target;
        setValoresForm({ ...valoresForm, [name]: value })
      }

    const handleOnSubmit= async (e)=> {
        e.preventDefault();
        const inventario = {
            serial, modelo, descripcion, color, foto, fechaCompra, precio,
            usuario:{
              _id: usuario,
            },
            marca: {
              _id : marca
            },
            tipoEquipo: {
              _id: tipo
            },
            estadoEquipo: {
              _id: estado
            }
    
          }
          console.log(inventario);
          try {
            Swal.fire({
              allowOutsideClick:false,
              text: 'Cargando...'
            });
            Swal.showLoading();        
           const { data } = await editInventario(inventarioId, inventario);
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
        <div className='container-fluid mt-3 mb-2'>
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title">Detalle Activo</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <img src= {inventario?.foto}/>
                        </div>
                        <div className="col-md-8">

                        <form onSubmit= {(e)=> handleOnSubmit(e)}>
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">Serial</label>
                  <input type="text" name='serial' 
                  value={serial} 
                  required
                  minLength={3}
                  onChange= {(e)=> handleOnChange(e) } 
                  className="form-control"  />
                 
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label  className="form-label">Modelo</label>
                  <input type="text" name='modelo'                  
                  value={modelo}
                  required
                  onChange= {(e)=> handleOnChange(e) } 
                   className="form-control"  />
                  
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <input type="text" name='descripcion'
                  value={descripcion} 
                  required
                  onChange= {(e)=> handleOnChange(e) } 
                   className="form-control"  />                  
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">Color</label>
                  <input type="text" name='color'
                  value={color}
                  required
                  onChange= {(e)=> handleOnChange(e) } 
                  className="form-control"  />                  
                </div>
              </div>
           
            </div>
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">Foto</label>
                  <input type="text" name='foto'
                  value={foto} 
                  required
                  onChange= {(e)=> handleOnChange(e) } 
                  className="form-control"  />
                 
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label  className="form-label">Fecha compra</label>
                  <input type="date" name='fechaCompra'
                  value={fechaCompra} 
                  required
                  onChange= {(e)=> handleOnChange(e) } 
                   className="form-control"  />
                  
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">Presio</label>
                  <input type="number" name='precio'
                  value={precio} 
                  required
                  onChange= {(e)=> handleOnChange(e) } 
                  className="form-control"  />                  
                </div>
              </div>

              <div className="col">
                <div className="mb-3">
                  <label className="form-label">Usuario</label>
                  <select className="form-select" 
                   required
                   onChange= {(e)=> handleOnChange(e) } 
                   name= 'usuario'
                   value={usuario}>
                    <option value="">--SELECCIONE--</option>
                    {
                      usuarios.map(({_id, nombre})=>{
                        return <option key={_id} value={_id}>{nombre}</option>
                      })
                    }
                     
                    </select>                 
                </div>
               </div>
              </div>
              <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">Marca</label>
                  <select className="form-select" 
                    required
                    onChange= {(e)=> handleOnChange(e) } 
                    name= 'marca'
                    value={marca} >
                    <option value="">--SELECCIONE--</option>
                    {
                      marcas.map(({_id, nombre})=>{
                        return <option key={_id} value={_id}>{nombre}</option>
                      })
                    }
                     
                    </select>        
                 
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label  className="form-label">Tipo equipo</label>
                  <select className="form-select" 
                    required
                    onChange= {(e)=> handleOnChange(e) } 
                    name= 'tipo'
                    value={tipo}>
                    <option value="">--SELECCIONE--</option>
                    {
                      tipos.map(({_id, nombre})=>{
                        return <option key={_id} value={_id}>{nombre}</option>
                      })
                    }
                     
                    </select>     
                  
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">Estado equipo</label>
                  <select className="form-select" 
                    required
                    onChange= {(e)=> handleOnChange(e) } 
                    name= 'estado'
                    value={estado}>
                    <option value="">--SELECCIONE--</option>
                    {
                      estados.map(({_id, nombre})=>{
                        return <option key={_id} value={_id}>{nombre}</option>
                      })
                    }
                     
                    </select>                   
                </div>
              </div>           
              </div> 
              <div className= "row">
                <div className="col">
                <button className="btn btn-primary"> Guardar </button>

                </div>
              </div>
              
          </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
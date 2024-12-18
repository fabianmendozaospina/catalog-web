import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';

const CrearCuenta = ({ cerrarModal }) => {
    const navigate = useNavigate();
    const [ cuenta, guardarCuenta ] = useState({});

    const iniciarSesion = async e => {
        e.preventDefault();

        try {
            const respuesta = await clienteAxios.post('/crear-cuenta', cuenta);

            // Lanzar una alerta.
            if(respuesta.status === 201) {
                Swal.fire(
                    'Agregado Correctamente',
                    respuesta.data.mensaje,
                    'success'
                )
            }

            // Redireccionar al inicio de sesión.
            cerrarModal();
            navigate('/iniciar-sesion');
            
        } catch (error) {
            let mensaje = "Error inesperado";
            console.error(error);

            if(error.response) {
                mensaje = error.response.data.mensaje + 
                    (error.response.data.detalle ? 
                        ': ' + error.response.data.detalle.join(', ') : '');
            }

            Swal.fire({
                type: 'error',
                title: 'Hubo un error',
                text: mensaje
            });            
        }
    }

    // Almacenar lo que el usuario escribe en el state.
    const leerDatos = e => {
        guardarCuenta({
            ...cuenta,
            [e.target.name] : e.target.value
        })
    }

    return (
        <div className="login">
        <h2>Crear Cuenta</h2>

        <div className="contenedor-formulario">
            <form
                onSubmit={iniciarSesion}
            >

                <div className="campo">
                    <label>Email</label>
                    <input 
                        type="text"
                        name="email"
                        placeholder="Ingresa tu Email"
                        required
                        onChange={leerDatos}
                    />
                </div>

                <div className="campo">
                    <label>Nombre</label>
                    <input 
                        type="text"
                        name="nombre"
                        placeholder="Ingresa tu Nombre"
                        required
                        onChange={leerDatos}
                    />
                </div>                

                <div className="campo">
                    <label>Password</label>
                    <input 
                        type="password"
                        name="password"
                        placeholder="Ingresa tu Password"
                        required
                        onChange={leerDatos}
                    />
                </div>

                <div className="campo">
                    <label>Confirma</label>
                    <input 
                        type="password"
                        name="confirmar"
                        placeholder="Confirma tu Password"
                        required
                        onChange={leerDatos}
                    />
                </div>                

                <input 
                    type="submit" 
                    value="Registrar" 
                    className="btn btn-verde btn-block" />
            </form>
        </div>
    </div>        
    );
}
 
export default CrearCuenta;
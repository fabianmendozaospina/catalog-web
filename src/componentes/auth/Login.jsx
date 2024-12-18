import {useState, useContext} from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import { CatalogoContext } from '../../context/catalogoContext';
import CrearCuenta from './CrearCuenta';

function Login(props){
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [_auth, guardarAuth] = useContext(CatalogoContext);
    const [ credenciales, guardarCredenciales] = useState({});

    const abrirModal = () => {
        setModalOpen(true);
    };

    const cerrarModal = () => {
        setModalOpen(false);
    };

    // Iniciar sesión en el servidor.
    const iniciarSesion = async e => {
        e.preventDefault();

        // Autenticar al usuario.
        try {
            const respuesta = await clienteAxios.post('/iniciar-sesion', credenciales);
            
            // Extraer el token y colocarlo en localstorage.
            const { token } = respuesta.data;
            localStorage.setItem('token', token);

            // Guardar el token en el state.
            guardarAuth({
                token, 
                isAuth: true
            });

            // Mostrar alerta.
            Swal.fire(
                'Login Correcto',
                'Has iniciado Sesión',
                'success'
            );

            // Redireccionar al home.
            navigate('/');

            
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
                title: 'Hubo un error!',
                text: mensaje
            });            
        }
    }

    // Almacenar lo que el usuario escribe en el state.
    const leerDatos = e => {
        guardarCredenciales({
            ...credenciales,
            [e.target.name] : e.target.value
        })
    }

    return(
        <>
            <div className="login">
                <h2>Iniciar Sesión</h2>

                <div className="contenedor-formulario">
                    <form
                        onSubmit={iniciarSesion}
                    >

                        <div className="campo">
                            <label>Email</label>
                            <input 
                                type="text"
                                name="email"
                                placeholder="Enter your Email"
                                required
                                onChange={leerDatos}
                            />
                        </div>

                        <div className="campo">
                            <label>Password</label>
                            <input 
                                type="password"
                                name="password"
                                placeholder="Enter your Password"
                                required
                                onChange={leerDatos}
                            />
                        </div>

                        <input 
                            type="submit" 
                            value="Login" 
                            className="btn btn-verde btn-block" />
                    </form>
                    <br />
                    <div className="contenedor">
                        If you are not registered yet, <a href="#" onClick={abrirModal} style={{color: "blue"}}>create your account</a>.
                    </div>
                </div>
            </div>
            <Modal 
                isOpen={modalOpen} 
                onRequestClose={cerrarModal}
                style={{ content: {width: '55%', margin: 'auto', transition: 'opacity 300ms ease-in-out', position: 'relative'}}}
            >
                <button 
                    className="btn btn-naranja btn-cerrar"
                    onClick={() => setModalOpen(false)}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '17px',
                        width: '40px',
                        height: '45px'
                    }}
                >
                    <i className="fas fa-times"></i>
                </button>
                <CrearCuenta cerrarModal={cerrarModal} />
            </Modal>
        </>
    )
}

export default Login;
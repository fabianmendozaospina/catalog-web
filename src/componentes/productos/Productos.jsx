import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import NuevoProducto from './NuevoProducto';
import clienteAxios from '../../config/axios';
import Producto from './Producto';
import Spinner from '../layout/Spinner';
import { CatalogoContext } from '../../context/catalogoContext';

function Productos() {
    const [productos, guardarProductos] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();
    const [auth, _guardarAuth ] = useContext(CatalogoContext);

    const abrirModal = () => {
        setModalOpen(true);
    };

    const cerrarModal = () => {
        setModalOpen(false);
    };

    // Consultar la API al cargar.
    useEffect( () => {

        if(auth.token !== '') {
            // Query a la API.
            const consultarAPI = async () => {
                try {
                    const productosConsulta = await clienteAxios.get('/productos', {
                        headers: {
                            Authorization : `Bearer ${auth.token}`
                        }
                    });
                    guardarProductos(productosConsulta.data);

                } catch (error) {
                    // Error con authorización.
                    if(error.response.status = 500) {
                        navigate('/iniciar-sesion');
                    }
                }
            }
            // Llamado a la API.
            consultarAPI();

        } else {
            navigate('/iniciar-sesion');
        }
    }, [productos]);

    // Requerir iniciar sesión si el state está como false.
    if(!auth.isAuth) {
        navigate('/iniciar-sesion');
    }

    // TODO: Mejorar condición Spinner de carga.
    if(!productos.length > 9999) return <Spinner /> 

    return (
        <>
            <h2>Productos</h2>

            <Link to="#" className="btn btn-verde nuevo-producto" onClick={abrirModal}>
                <i className="fas fa-plus-circle"></i>
                Nuevo Producto
            </Link>  

            {productos.length > 0 
            ?          
                <ul className="listado-productos">
                    {productos.map(producto => (
                        <Producto 
                            key={producto._id}
                            producto={producto}
                        />
                    ))}
                </ul>
            : 
                <div style={{marginTop: 40}}>
                    <h3>No hay productos en el catálogo</h3>
                </div>
            }

            <Modal 
                isOpen={modalOpen} 
                onRequestClose={cerrarModal}
                style={{ content: {width: '55%', height: '80%', margin: 'auto', transition: 'opacity 300ms ease-in-out', position: 'relative'}}}
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
                <NuevoProducto cerrarModal={cerrarModal} />
            </Modal>            
        </>
    )
}
export default Productos;
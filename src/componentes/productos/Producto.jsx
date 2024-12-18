import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { CatalogoContext } from '../../context/catalogoContext';

function Producto({producto}) {
    const navigate = useNavigate();
    const [auth, _guardarAuth ] = useContext(CatalogoContext);

    // Elimina un producto.
    const eliminarProducto = id => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Un producto eliminado no se puede recuperar",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar',
            cancelButtonText : 'No, Cancelar'
        }).then((result) => {
            if (result.value) {
              // Eliminar en la rest api.
              clienteAxios.delete(`/productos/${id}`, {
                    headers: {
                        Authorization : `Bearer ${auth.token}`
                    }
                })
                .then(res => {
                    if(res.status === 200) {
                        Swal.fire(
                            'Eliminado',
                            res.data.mensaje,
                            'success'
                        )
                    }
                })
            }
        })
    }

    // Verificar si el usuario está autenticado o no.
    if(!auth.isAuth) {
        navigate('/iniciar-sesion');
    }    

    const {_id, nombre, descripcion, precio } = producto;

    return (
        <li className="producto">
            <div className="info-producto">
                <p className="nombre">{nombre}</p>
                <p className="descripcion">{descripcion}</p>
                <p className="precio">$ {precio}</p>
            </div>
            <div className="acciones">
                <Link to={`/productos/editar/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Producto
                </Link>

                <button 
                    type="button" 
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => eliminarProducto(_id) }
                >
                    <i className="fas fa-times"></i>
                    Eliminar Producto
                </button>
            </div>
        </li>
    )
}
export default Producto;
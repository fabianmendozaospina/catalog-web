import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CatalogoContext } from '../../context/catalogoContext';

const Header = (props) => {
    const navigate = useNavigate();
    const [auth, guardarAuth] = useContext(CatalogoContext);

    const cerrarSesion = () => {
        guardarAuth({
            token: '',
            isAuth: false
        });

        localStorage.setItem('token', '');

        // Redireccionar al inicio de sesión.
        navigate('/iniciar-sesion');
    }

    return (
        <header className="barra">
            <div className="contenedor">
                <div className="contenido-barra">
                    <h1>Medical Products Catalog</h1>

                    { auth.isAuth ? (
                        <button 
                            type="button"
                            className="btn btn-naranja"
                            onClick={cerrarSesion}
                        >
                            <i className="far fa-times-circle"></i>
                            Log out
                        </button>
                    ) : 
                        <Link 
                            to="/iniciar-sesion" 
                            className="btn btn-verde"
                        >
                            <i className="fas fa-plus-circle"></i>
                            Login
                        </Link>                 
                    }
                
                </div>
            </div>
        </header>
    )
}

export default Header;
import { Link } from 'react-router-dom';

const Navegacion = () => {
    return ( 
        <aside className="sidebar col-3">
            <h2>Administration</h2>

            <nav className="navegacion">
                <Link to={"/"} className="home">Home</Link>
                <Link to={"/productos"} className="productos">Products</Link>
            </nav>
        </aside>

     );
}
 
export default Navegacion;
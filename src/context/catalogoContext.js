import React, { useState } from 'react';

const CatalogoContext = React.createContext([ {}, () => {} ]);

const CatalogoProvider = props => {
    // Definir el state inicial.
    const [auth, guardarAuth ] = useState({
        token: '',
        isAuth: false
    });

    return (
        <CatalogoContext.Provider value={[auth, guardarAuth]}>
            {props.children}
        </CatalogoContext.Provider> 
    );
}

export { CatalogoContext, CatalogoProvider};
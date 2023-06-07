import React, { useEffect, useRef } from "react";
import { mount } from 'auth/Auth';
import { useHistory } from 'react-router-dom';

export default () => {
    const ref = useRef( null );
    const history = useHistory();

    useEffect( () => {
        const { onParentNavigate } = mount( ref.current, {
            onNavigate: ( { pathname: nextPathName } ) => {
                const { pathname } = history.location;
                if( pathname !== nextPathName ) {
                    history.push( nextPathName );
                }
            },
            initialPath: history.location.pathname
        } );
        history.listen( onParentNavigate );
    }, [] );

    return <div ref={ref} ></div>
}
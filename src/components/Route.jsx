import {useEffect, useState} from 'react';

/**
 *  Renders ``childern`` props if current ``window.location.pathname`` is equal
 *  to ``path``, otherwise render ``null``
 */
const Route = ({path, children}) => {

    const [pathname, setPathname] = useState(window.location.pathname);

    useEffect(() => {
        const onLocationChange = () => {
            
            setPathname(window.location.pathname); 
        }

        window.addEventListener('popstate', onLocationChange);

        return () => {
            window.removeEventListener('popstate', onLocationChange);
        }
    },[])

    return pathname === path && children
};

export default Route;
import {useEffect, useState} from 'react';

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
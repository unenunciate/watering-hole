import StrapiAccountContext from '../contexts/strapi-account';

import { useContext } from 'react';

function useStrapiAccount () {
    const context = useContext(StrapiAccountContext);
    
    return null;
}

export { useStrapiAccount };
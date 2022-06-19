import React from 'react';
import {Helmet} from 'react-helmet';


const MonBackground = () => {
    return <div>
        <Helmet>
            <style>{'body { background-color: #ebfffb; }'}</style>
            <style>{'body { min-height: 100vh; }'}</style>
        </Helmet>
    </div>
}
export default MonBackground;
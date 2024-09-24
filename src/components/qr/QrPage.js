import React, {useState} from 'react';
import Scaner from './Scaner'

const QrPage = () => {

    const [scanResult, setScanResult] = useState(null)
    return (
        <>
        <div>
            <Scaner setScanResult={setScanResult}/>
        </div>
        <div>
            {JSON.stringify(scanResult,null,' ')}
        </div>
        </>
    );
};

export default QrPage;
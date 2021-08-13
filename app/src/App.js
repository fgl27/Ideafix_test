import React, {useRef} from 'react';
import './App.css';

import Notas from './components/notas/index';
import {Input} from './components/input/index';

function App() {
    const ref = useRef(null);

    const updateNotas = notas => {
        ref.current.setNotas(notas);
    };

    return (
        <div className="App">
            <header>
                <img
                    className="logo drop_shadow"
                    src={process.env.PUBLIC_URL + '/logo512.png'}
                />
            </header>
            <div className="container">
                <Input updateNotas={updateNotas} />
                <Notas ref={ref} />
            </div>
        </div>
    );
}

export default App;

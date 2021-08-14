import React, {
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle,
} from 'react';

import './index.css';
import {Nota} from './nota/index';
import {Loading} from '../loading/index';

// Kick off fetching as early as possible
const response = fetch('http://localhost:5000');

const Notas = forwardRef((props, ref) => {
    const [notas, setNotas] = useState([]);

    useEffect(() => {
        response
            .then(res => {
                if (!res.ok) {
                    throw new Error('HTTP status ' + res.status);
                }
                return res.json();
            })
            .then(notas => setNotas(notas))
            .catch(error => console.error('componentDidMount Error:', error));
    }, []);

    useImperativeHandle(ref, () => {
        return {
            setNotas: setNotas,
        };
    });

    return (
        <div className="notas_container">
            <h1 className="textCenter notash1">Suas notas</h1>
            {notas.length ? (
                <div className="notas_inner_container">
                    {notas.map(nota => (
                        <Nota key={nota._id} notas={nota} setNotas={setNotas} />
                    ))}
                </div>
            ) : (
                <div className="loading_container">
                    <Loading />
                </div>
            )}
        </div>
    );
});

Notas.displayName = 'Notas';
export default Notas;

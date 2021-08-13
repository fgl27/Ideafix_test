import React, {
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle,
} from 'react';

import './index.css';
import {IoClose} from 'react-icons/io5';

const Notas = forwardRef((props, ref) => {
    const [notas, setNotas] = useState([]);

    useEffect(() => {
        console.log('useEffect');
        fetch('http://localhost:5000')
            .then(res => {
                if (!res.ok) {
                    throw new Error('HTTP status ' + res.status);
                }
                return res.json();
            })
            .then(notas => setNotas(notas))
            .catch(error => console.error('componentDidMount Error:', error));
    }, []);

    const DeletaNota = async id => {
        console.log('DeletaNota');
        fetch('http://localhost:5000/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(notas => {
                if (Array.isArray(notas)) {
                    setNotas(notas);
                } else {
                    const msg = notas.msg;
                    console.log(msg);
                    alert(msg);
                }
            })
            .catch(error => console.error('DeletaNota Error:', error));
    };

    useImperativeHandle(ref, () => {
        return {
            setNotas: setNotas,
        };
    });

    return (
        <div>
            <h1 className="textCenter">Suas notas</h1>
            <div className="notas_container">
                {notas.map(nota => (
                    <div key={nota._id} className="nota">
                        <div key={nota._id + 'titulo'} className="nota_titulo">
                            {nota.titulo}
                        </div>
                        <button
                            key={nota._id + 'close_button'}
                            className="nota_button"
                            name={nota._id}
                            onClick={() => DeletaNota(nota._id)}>
                            <IoClose
                                key={nota._id + 'close_icon'}
                                className="react-icons"
                            />
                        </button>
                        <div key={nota._id + 'desc'} className="nota_desc">
                            {nota.desc}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
});

Notas.displayName = 'Notas';
export default Notas;

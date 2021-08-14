import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import './index.css';
import {IoClose} from 'react-icons/io5';

Nota.propTypes = {
    notas: PropTypes.object,
    setNotas: PropTypes.func,
};

export function Nota(props) {
    const [nota] = useState(props.notas);
    const [show, setShow] = useState(false);

    useEffect(() => {}, [show]);

    const DeletaNota = async id => {
        fetch('http://localhost:5000/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(notas => {
                if (Array.isArray(notas)) {
                    props.setNotas(notas);
                } else {
                    const msg = notas.msg;
                    console.log(msg);
                    alert(msg);
                }
            })
            .catch(error => console.error('DeletaNota Error:', error));
    };

    return (
        <div key={nota._id + 'nota'} className="nota">
            <div className="nota_titulo_container">
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
            </div>
            <div
                key={nota._id + 'desc'}
                className={show ? 'nota_desc nota_desc_show' : 'nota_desc'}
                onClick={() => setShow(!show)}>
                {nota.desc}
            </div>
        </div>
    );
}

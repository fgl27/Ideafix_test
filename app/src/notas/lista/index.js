import React from 'react';
import './index.css';
import {IoClose} from 'react-icons/io5';

export function Lista(value) {
    return (
        <div>
            <h1 className="textCenter">Suas notas</h1>
            <div className="notas_container">
                {value.notas.map(nota => (
                    <div key={nota._id} className="nota">
                        <div key={nota._id + 'titulo'} className="nota_titulo">
                            {nota.titulo}
                        </div>
                        <button
                            key={nota._id + 'close_button'}
                            className="nota_button"
                            name={nota._id}
                            onClick={() => value.DeletaNota(nota._id)}>
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
}

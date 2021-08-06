import React from 'react';
import './index.css';
import {IoClose} from 'react-icons/io5';

export function Lista(value) {
    return (
        <div>
            <h1 className="textCenter">Suas notas</h1>
            <div className="notas_container">
                {value.notas.map(nota => (
                    <div key={nota.id} className="nota">
                        <div key={nota.id + 'titulo'} className="nota_titulo">
                            {nota.titulo}
                        </div>
                        <button
                            key={nota.id + 'close_button'}
                            className="nota_button"
                            name={nota.id}
                            onClick={() => value.DeletaNota(nota.id)}>
                            <IoClose
                                key={nota.id + 'close_icon'}
                                className="react-icons"
                            />
                        </button>
                        <div key={nota.id + 'desc'} className="nota_desc">
                            {nota.desc}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

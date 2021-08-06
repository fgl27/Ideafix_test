import React from 'react';
import './index.css';

export function Inputs(value) {
    return (
        <div className="input_container">
            <h2 className="textCenter">Bloco de notas</h2>
            <input
                className="input"
                type="text"
                placeholder="Título"
                value={value.titulo}
                name="titulo"
                onChange={value.AtualizaState}
            />
            <textarea
                className="input inputDesc"
                type="text"
                placeholder="Descrição"
                value={value.desc}
                name="desc"
                onChange={value.AtualizaState}
            />
            <button className="button" onClick={() => value.AdicionaNota()}>
                <div className="drop_shadow">Criar nota</div>
            </button>
        </div>
    );
}

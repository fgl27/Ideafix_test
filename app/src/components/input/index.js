import React, {useState} from 'react';
import PropTypes from 'prop-types';

import './index.css';

Input.propTypes = {
    updateNotas: PropTypes.func,
};

export function Input(props) {
    const [state, setState] = useState({
        titulo: '',
        desc: '',
    });

    const AdicionaNota = async () => {
        fetch('http://localhost:5000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(state),
        })
            .then(res => res.json())
            .then(notas => {
                if (Array.isArray(notas)) {
                    setState({
                        titulo: '',
                        desc: '',
                    });
                    props.updateNotas(notas);
                } else {
                    const msg = notas.msg;
                    console.log(msg);
                    alert(msg);
                }
            })
            .catch(error => console.error('AdicionaNota Error:', error));
    };

    const AtualizaState = async env => {
        const {name, value} = env.target;
        setState({
            ...state,
            [name]: value,
        });
    };

    return (
        <div className="input_container">
            <h2 className="textCenter">Bloco de notas</h2>
            <input
                className="input"
                type="text"
                placeholder="Título"
                name="titulo"
                value={state.titulo}
                onChange={e => AtualizaState(e)}
            />
            <textarea
                className="input inputDesc"
                type="text"
                placeholder="Descrição"
                name="desc"
                value={state.desc}
                onChange={e => AtualizaState(e)}
            />
            <button className="button" onClick={() => AdicionaNota()}>
                <div className="drop_shadow">Criar nota</div>
            </button>
        </div>
    );
}

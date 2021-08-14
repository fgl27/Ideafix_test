import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import './index.css';
import {IoClose} from 'react-icons/io5';
import {IoMdBackspace} from 'react-icons/io';
import {FaRegEdit} from 'react-icons/fa';
import {AiFillSave} from 'react-icons/ai';

Nota.propTypes = {
    notas: PropTypes.object,
    setNotas: PropTypes.func,
};

export function Nota(props) {
    const [nota, setNota] = useState(props.notas);
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);

    useEffect(() => {}, [show, edit]);

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

    const AtualizaNota = async env => {
        const {name, value} = env.target;
        setNota({
            ...nota,
            [name]: value,
        });
    };

    const PatchNota = async () => {
        fetch('http://localhost:5000/' + nota._id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nota),
        })
            .then(res => res.json())
            .then(nota => {
                if (!nota.msg) {
                    setNota(nota);
                    setEdit(!edit);
                } else {
                    const msg = nota.msg;
                    console.log(msg);
                    alert(msg);
                }
            })
            .catch(error => console.error('AdicionaNota Error:', error));
    };

    const ShowNota = () => {
        return (
            <div key={nota._id + 'nota'} className="nota">
                <div
                    key={nota._id + 'titulo_container'}
                    className="nota_titulo_container">
                    <div key={nota._id + 'titulo'} className="nota_titulo">
                        {nota.titulo}
                    </div>
                    <button
                        key={nota._id + 'edit_button'}
                        className="edit_button tooltip"
                        name={nota._id}
                        onClick={() => setEdit(!edit)}>
                        <FaRegEdit key={nota._id + 'edit_icon'} />
                        <span className="tooltiptext">Editar</span>
                    </button>
                    <button
                        key={nota._id + 'close_button'}
                        className="delete_button tooltip"
                        name={nota._id}
                        onClick={() => DeletaNota(nota._id)}>
                        <IoClose
                            key={nota._id + 'close_icon'}
                            className="delete-icon"
                        />
                        <span className="tooltiptext">Deletar</span>
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
    };

    const EditNota = () => {
        return (
            <div key={nota._id + 'nota'} className="nota">
                <div
                    key={nota._id + 'titulo_container'}
                    className="nota_titulo_container">
                    <input
                        key={nota._id + 'titulo_edit'}
                        className="input nota_imput"
                        type="text"
                        placeholder="Título"
                        name="titulo"
                        value={nota.titulo}
                        onChange={e => AtualizaNota(e)}
                    />
                    <button
                        key={nota._id + 'edit_button'}
                        className="edit_button tooltip"
                        name={nota._id}
                        onClick={() => PatchNota()}>
                        <AiFillSave
                            key={nota._id + 'save_icon'}
                            className="save-icon"
                        />
                        <span className="tooltiptext">Salvar</span>
                    </button>
                    <button
                        key={nota._id + 'back_button'}
                        className="delete_button tooltip"
                        name={nota._id}
                        onClick={() => setEdit(!edit)}>
                        <IoMdBackspace
                            key={nota._id + 'back_icon'}
                            className="back-icon"
                        />
                        <span className="tooltiptext">Cancelar</span>
                    </button>
                </div>
                <textarea
                    key={nota._id + 'desc_edit'}
                    className="input inputDesc nota_imput"
                    type="text"
                    placeholder="Descrição"
                    name="desc"
                    value={nota.desc}
                    onChange={e => AtualizaNota(e)}
                />
            </div>
        );
    };

    return edit ? EditNota() : ShowNota();
}

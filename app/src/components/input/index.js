import React, {useState} from 'react';
import PropTypes from 'prop-types';

import './index.css';

Input.propTypes = {
    updateNotes: PropTypes.func,
};

export function Input(props) {
    const [note, setNote] = useState({
        title: '',
        description: '',
    });

    const AddNote = async () => {
        fetch('http://localhost:5000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note),
        })
            .then(res => res.json())
            .then(notes => {
                if (Array.isArray(notes)) {
                    setNote({
                        title: '',
                        description: '',
                    });
                    props.updateNotes(notes);
                } else {
                    const msg = notes.msg;
                    console.log(msg);
                    alert(msg);
                }
            })
            .catch(error => console.error('AddNote Error:', error));
    };

    const Updatenote = async env => {
        const {name, value} = env.target;
        setNote({
            ...note,
            [name]: value,
        });
    };

    return (
        <div className="input_container">
            <h2 className="textCenter">Notepad</h2>
            <input
                className="input"
                type="text"
                placeholder="Title"
                name="title"
                value={note.title}
                onChange={e => Updatenote(e)}
            />
            <textarea
                className="input inputDescription"
                type="text"
                placeholder="Description"
                name="description"
                value={note.description}
                onChange={e => Updatenote(e)}
            />
            <button className="button" onClick={() => AddNote()}>
                <div className="drop_shadow">Add note</div>
            </button>
        </div>
    );
}

import React, {useState} from 'react';
import PropTypes from 'prop-types';

import './index.css';

Input.propTypes = {
    updateNotes: PropTypes.func,
};

export function Input(props) {
    const [NotePad, setNotePad] = useState({
        title: '',
        description: '',
    });

    const AddNote = async () => {
        fetch('http://localhost:5000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(NotePad),
        })
            .then(res => res.json())
            .then(notes => {
                if (Array.isArray(notes)) {
                    setNotePad({
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

    const UpdateNotepad = async event => {
        const {name, value} = event.target;
        setNotePad({
            ...NotePad,
            [name]: value,
        });
    };

    return (
        <div className="input_container">
            <h2 className="textCenter text_shadow">Notepad</h2>
            <input
                className="input"
                type="text"
                placeholder="Title"
                name="title"
                value={NotePad.title}
                onChange={e => UpdateNotepad(e)}
            />
            <textarea
                className="input inputDescription"
                type="text"
                placeholder="Description"
                name="description"
                value={NotePad.description}
                onChange={e => UpdateNotepad(e)}
            />
            <button className="button text_shadow" onClick={() => AddNote()}>
                <div className="drop_shadow">Add note</div>
            </button>
        </div>
    );
}

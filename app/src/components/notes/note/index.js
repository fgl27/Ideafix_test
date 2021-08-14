import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import './index.css';
import {IoClose} from 'react-icons/io5';
import {IoMdBackspace} from 'react-icons/io';
import {FaRegEdit} from 'react-icons/fa';
import {AiFillSave} from 'react-icons/ai';

Note.propTypes = {
    notes: PropTypes.object,
    setNotes: PropTypes.func,
};

export function Note(props) {
    const [note, setNote] = useState(props.notes);
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);

    useEffect(() => {}, [show, edit]);

    const DeleteNote = async id => {
        fetch('http://localhost:5000/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(notes => {
                if (Array.isArray(notes)) {
                    props.setNotes(notes);
                } else {
                    const msg = notes.msg;
                    console.log(msg);
                    alert(msg);
                }
            })
            .catch(error => console.error('DeleteNote Error:', error));
    };

    const UpdateNote = async env => {
        const {name, value} = env.target;
        setNote({
            ...note,
            [name]: value,
        });
    };

    const PatchNote = async () => {
        fetch('http://localhost:5000/' + note._id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note),
        })
            .then(res => res.json())
            .then(note => {
                if (!note.msg) {
                    setNote(note);
                    setEdit(!edit);
                } else {
                    const msg = note.msg;
                    console.log(msg);
                    alert(msg);
                }
            })
            .catch(error => console.error('AdicionaNote Error:', error));
    };

    const ShowNote = () => {
        return (
            <div key={note._id + 'note'} className="note">
                <div
                    key={note._id + 'title_container'}
                    className="note_title_container">
                    <div key={note._id + 'title'} className="note_title">
                        {note.title}
                    </div>
                    <button
                        key={note._id + 'edit_button'}
                        className="edit_button tooltip"
                        name={note._id}
                        onClick={() => setEdit(!edit)}>
                        <FaRegEdit key={note._id + 'edit_icon'} />
                        <span className="tooltiptext">Edit</span>
                    </button>
                    <button
                        key={note._id + 'close_button'}
                        className="delete_button tooltip"
                        name={note._id}
                        onClick={() => DeleteNote(note._id)}>
                        <IoClose
                            key={note._id + 'close_icon'}
                            className="delete-icon"
                        />
                        <span className="tooltiptext">Delete</span>
                    </button>
                </div>
                <div
                    key={note._id + 'description'}
                    className={
                        show
                            ? 'note_description note_description_show'
                            : 'note_description'
                    }
                    onClick={() => setShow(!show)}>
                    {note.description}
                </div>
            </div>
        );
    };

    const EditNote = () => {
        return (
            <div key={note._id + 'note'} className="note">
                <div
                    key={note._id + 'title_container'}
                    className="note_title_container">
                    <input
                        key={note._id + 'title_edit'}
                        className="input note_input"
                        type="text"
                        placeholder="Título"
                        name="title"
                        value={note.title}
                        onChange={e => UpdateNote(e)}
                    />
                    <button
                        key={note._id + 'edit_button'}
                        className="edit_button tooltip"
                        name={note._id}
                        onClick={() => PatchNote()}>
                        <AiFillSave
                            key={note._id + 'save_icon'}
                            className="save-icon"
                        />
                        <span className="tooltiptext">Save</span>
                    </button>
                    <button
                        key={note._id + 'back_button'}
                        className="delete_button tooltip"
                        name={note._id}
                        onClick={() => setEdit(!edit)}>
                        <IoMdBackspace
                            key={note._id + 'back_icon'}
                            className="back-icon"
                        />
                        <span className="tooltiptext">Cancel Edit</span>
                    </button>
                </div>
                <textarea
                    key={note._id + 'description_edit'}
                    className="input inputDescription note_input"
                    type="text"
                    placeholder="Descrição"
                    name="description"
                    value={note.description}
                    onChange={e => UpdateNote(e)}
                />
            </div>
        );
    };

    return edit ? EditNote() : ShowNote();
}

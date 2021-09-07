import React, {
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle,
} from 'react';

import './index.css';
import {Note} from './note/index';
import {Loading} from '../loading/index';

// Kick off fetching as early as possible
const response = fetch('http://localhost:5000');

const Notes = forwardRef((props, ref) => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        response
            .then(res => {
                if (!res.ok) {
                    throw new Error('HTTP status ' + res.status);
                }
                return res.json();
            })
            .then(notes => setNotes(notes))
            .catch(error => console.error('componentDidMount Error:', error));
    }, []);

    useImperativeHandle(ref, () => {
        return {
            setNotes: setNotes,
        };
    });

    return (
        <div className="notes_container">
            <h1 className="textCenter notes_container_h1 text_shadow">
                Your notes
            </h1>
            {notes.length ? (
                <div className="notes_inner_container">
                    {notes.map(note => (
                        <Note key={note._id} notes={note} setNotes={setNotes} />
                    ))}
                </div>
            ) : (
                <div className="loading_container">
                    <Loading />
                </div>
            )}
        </div>
    );
});

Notes.displayName = 'Notes';
export default Notes;

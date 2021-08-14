import React, {useRef} from 'react';
import './App.css';

import Notes from './components/notes/index';
import {Input} from './components/input/index';

function App() {
    const ref = useRef(null);

    const updateNotes = notes => {
        ref.current.setNotes(notes);
    };

    return (
        <div className="App">
            <header>
                <a
                    className="drop_shadow"
                    href="https://github.com/fgl27/Notepad_app"
                    target="_blank"
                    rel="noreferrer">
                    Designed by fgl27
                    <img
                        className="logo drop_shadow"
                        src={process.env.PUBLIC_URL + '/logo512.png'}
                    />
                </a>
            </header>
            <div className="container">
                <Input updateNotes={updateNotes} />
                <Notes ref={ref} />
            </div>
        </div>
    );
}

export default App;

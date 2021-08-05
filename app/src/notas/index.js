import React, {Component} from 'react';
import {IoClose} from 'react-icons/io5';

class Notas extends Component {
    constructor() {
        super();
        this.state = {
            notas: [],
            titulo: '',
            desc: '',
        };
        this.inputTitle = React.createRef();
    }

    componentDidMount() {
        fetch('http://localhost:5000')
            .then(res => {
                if (!res.ok) {
                    throw new Error('HTTP status ' + res.status);
                }
                return res.json();
            })
            .then(notas => this.setState({notas}));
    }

    UpdateNotas(notas, clearStates) {
        if (Array.isArray(notas)) {
            this.setState(
                {
                    notas,
                    titulo: clearStates ? '' : this.titulo,
                    desc: clearStates ? '' : this.desc,
                },
                () => console.log('notas fetched...', notas),
            );

            if (clearStates) this.inputTitle.value = '';
        } else {
            const msg = notas.msg;
            console.log(msg);
            alert(msg);
        }
    }

    AdicionaNota = async () => {
        fetch('http://localhost:5000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                (({titulo, desc}) => ({titulo, desc}))(this.state),
            ),
        })
            .then(res => res.json())
            .then(notas => this.UpdateNotas(notas, true))
            .catch(error => console.error('AdicionaNota Error:', error));
    };

    DeletaNota = async id => {
        fetch('http://localhost:5000/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(notas => this.UpdateNotas(notas))
            .catch(error => console.error('DeletaNota Error:', error));
    };

    UpdateTitulo = async env => {
        this.setState({titulo: env.target.value});
    };

    UpdateDesc = async env => {
        this.setState({desc: env.target.value});
    };

    render() {
        return (
            <div>
                <header>
                    <a
                        href="https://ideafix.com.br/"
                        target="_blank"
                        rel="noreferrer">
                        <img
                            className="logo"
                            src="https://ideafix.com.br/wp-content/uploads/2020/12/Ideafix_Logo-RGB-01.png"></img>
                    </a>
                </header>
                <div className="container">
                    <div className="input_container">
                        <h2 className="textCenter">Bloco de notas</h2>
                        <input
                            className="input"
                            type="text"
                            placeholder="Título"
                            ref={el => (this.inputTitle = el)}
                            value={this.state.title}
                            onChange={this.UpdateTitulo}
                        />
                        <textarea
                            className="input inputDesc"
                            type="text"
                            placeholder="Descrição"
                            value={this.state.desc}
                            onChange={this.UpdateDesc}
                        />
                        <button className="button" onClick={this.AdicionaNota}>
                            <div className="button_text">Criar nota</div>
                        </button>
                    </div>
                    <div>
                        <h1 className="textCenter">Suas notas</h1>
                        <div className="notas_container">
                            {this.state.notas.map(nota => (
                                <div key={nota.id} className="nota">
                                    <div key={nota.id + 'titleHolder'}>
                                        <div
                                            key={nota.id + 'titulo'}
                                            className="nota_titulo">
                                            {nota.titulo}
                                        </div>
                                        <button
                                            className="nota_button"
                                            onClick={() =>
                                                this.DeletaNota(nota.id)
                                            }>
                                            <IoClose className="react-icons" />
                                        </button>
                                    </div>
                                    <div
                                        key={nota.id + 'desc'}
                                        className="nota_desc">
                                        {nota.desc}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Notas;

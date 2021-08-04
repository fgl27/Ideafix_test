import React, {Component} from 'react';

class Notas extends Component {

    constructor() {
        super();
        this.state = {
            notas: [],
            titulo: "",
            desc: ""
        };
    }

    componentDidMount() {
        fetch('http://localhost:5000')
            .then(res => {
                console.log(res.status); // Will show you the status
                if (!res.ok) {
                    throw new Error("HTTP status " + res.status);
                }
                return res.json();
            })
            .then(notas => this.setState({notas}, () => console.log('notas fetched...', notas)));
    }

    Addnote = async () => {

        fetch('http://localhost:5000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify((({titulo, desc}) => ({titulo, desc}))(this.state)),
        })
            .then(res => res.json())
            .then(notas => {
                if (Array.isArray(notas)) {
                    this.setState({notas}, () => console.log('notas fetched...', notas))
                } else {
                    console.log(notas.msg);
                }
            })
            .catch((error) => console.error('Error:', error));

    }

    UpdateTitulo = async (env) => {
        this.setState({titulo: env.target.value});
    };

    UpdateDesc = async (env) => {
        this.setState({desc: env.target.value});
    };

    render() {
        return (
            <div>
                <input
                    type="text"
                    name="Título"
                    value={this.state.title}
                    onChange={this.UpdateTitulo}
                />
                <input
                    type="text"
                    name="Descrição"
                    value={this.state.desc}
                    onChange={this.UpdateDesc}
                />
                <button
                    onClick={this.Addnote}
                />

                <h1>Notas</h1>
                {this.state.notas.map(nota => (
                    <span key={nota.id}>
                        <h3 key={nota.id + 'titulo'}>{nota.titulo}</h3>
                        <p key={nota.id + 'desc'}>{nota.desc}</p>
                    </span>
                ))}
            </div>
        );
    }

}

export default Notas;
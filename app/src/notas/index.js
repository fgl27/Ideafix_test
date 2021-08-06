import React, {Component} from 'react';
import './index.css';
import {Lista} from './lista/index';
import {Inputs} from './inputs/index';

class Notas extends Component {
    //Inicializa as variaveis de estado
    constructor() {
        super();
        this.state = {
            notas: [],
            titulo: '',
            desc: '',
        };
        this.UpdateNotas = this.UpdateNotas.bind(this);
        this.AdicionaNota = this.AdicionaNota.bind(this);
        this.DeletaNota = this.DeletaNota.bind(this);
        this.AtualizaState = this.AtualizaState.bind(this);
    }

    //Carrega as notas da API quando o componente é iniciado
    componentDidMount() {
        fetch('http://localhost:5000')
            .then(res => {
                if (!res.ok) {
                    throw new Error('HTTP status ' + res.status);
                }
                return res.json();
            })
            .then(notas => this.setState({notas}))
            .catch(error => console.error('componentDidMount Error:', error));
    }

    //Função usada pra atualizar as notas quando alguma é adicionada ou deletada
    UpdateNotas = async (notas, clearStates) => {
        if (Array.isArray(notas)) {
            this.setState({
                notas,
                titulo: clearStates ? '' : this.state.titulo,
                desc: clearStates ? '' : this.state.desc,
            });
        } else {
            const msg = notas.msg;
            console.log(msg);
            alert(msg);
        }
    };

    //Função adiciona nota
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

    //Função deleta nota
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

    //Função para atualizar o state título e descrição
    AtualizaState = async env => {
        this.setState({[env.target.name]: env.target.value});
    };

    //Reader que contem os elementos do APP
    render() {
        return (
            <div>
                <header>
                    <a
                        href="https://ideafix.com.br/"
                        target="_blank"
                        rel="noreferrer">
                        <img
                            className="logo drop_shadow"
                            src="https://ideafix.com.br/wp-content/uploads/2020/12/Ideafix_Logo-RGB-01.png"
                        />
                    </a>
                </header>
                <div className="container">
                    <Inputs
                        inputTitle={this.inputTitle}
                        titulo={this.state.titulo}
                        desc={this.state.desc}
                        AtualizaState={this.AtualizaState}
                        AdicionaNota={this.AdicionaNota}
                    />
                    <Lista
                        notas={this.state.notas}
                        DeletaNota={this.DeletaNota}
                    />
                </div>
            </div>
        );
    }
}

export default Notas;

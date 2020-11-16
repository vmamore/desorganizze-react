import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export default function NewUserModal({ show, handleRegistrarClose }) {
    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitRegistrar = event => {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
            return;
        }

        event.preventDefault();
        setValidated(false);

        axios.post('https://localhost:5001/api/users', { password, username })
            .then(resultado => {
                console.log(resultado)
                setUsername('');
                setPassword('');
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(() => {
                setUsername('');
                setPassword('');
            });

        handleRegistrarClose()
    }

    return (
        <Modal show={show} onHide={handleRegistrarClose}>
            <Modal.Header closeButton>
                <Modal.Title>Cadastro de Usuário</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={onSubmitRegistrar}>
                    <Form.Group controlId="formBasicUser">
                        <Form.Label>Usuário</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Usuário"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required />
                        <Form.Control.Feedback type="invalid">
                            Insira um usuario.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required />
                        <Form.Control.Feedback type="invalid">
                            Insira uma senha.
                        </Form.Control.Feedback>
                        <Form.Text id="passwordHelpBlock" muted>
                            Tamanho minímo de 5 caracteres.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Button variant="outline-primary" type="submit" className='mr-2'>
                            Cadastrar
                        </Button>
                        <Button variant="outline-danger" type="button" onClick={handleRegistrarClose} >
                            Cancelar
                        </Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
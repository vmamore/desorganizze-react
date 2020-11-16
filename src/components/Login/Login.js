import React, { useState, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Alert } from "react-bs-notifier";

import { useUser } from '../../contexts/UserContext';
import axios from 'axios';

export default function Login({ show, handleLoginClose }) {
    const [validated, setValidated] = useState(false);
    const { user, setUser } = useUser();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alerts, setAlerts] = useState([]);
    const onSubmitAcessar = event => {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
            return;
        }

        event.preventDefault();
        setValidated(false);

        event.preventDefault();

        axios.post('https://localhost:5001/api/users/login', { password, username })
            .then(resultado => {
                setUser({
                    username,
                    authenticated: true,
                    ...resultado.data
                })
            });

        handleLoginClose()
    }

    const doNothing = () => {
        console.log('foi');
    }

    return (
        <>
            {/* <Alert position={'bottom-right'} timeout={'3000'} onDismiss={doNothing} type={'danger'} headline={'Erro'}>
                Erro ao logar
            </Alert> */}

            <Modal show={show} onHide={handleLoginClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Acessar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={onSubmitAcessar}>
                        <Form.Group controlId="formBasicLogin">
                            <Form.Label>Login</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Login"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Insira um usuario.
                        </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Insira um usuario.
                        </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Button variant="primary" type="submit" block>
                                Acessar
                        </Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useHistory } from "react-router-dom";
import { useUser } from '../../contexts/UserContext';
import './Login.css';
import API from '../../utils/API';

export default function LoginTest() {
    let history = useHistory();

    const [validated, setValidated] = useState(false);
    const { setUser } = useUser();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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

        API.post('/login', { password, username })
        .then(resultado => {
            setUser({
                username,
                authenticated: true,
                ...resultado.data
            });

            history.push("/");
        });
    }

    return (
        <Form noValidate validated={validated} onSubmit={onSubmitAcessar} className="form-signin">
            <h3 className="text-center" id="desorganizze-titulo">Desorganizze</h3>
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
                <Button variant="success" type="submit" block>
                    Acessar
                </Button>
            </Form.Group>
        </Form>
    );
}
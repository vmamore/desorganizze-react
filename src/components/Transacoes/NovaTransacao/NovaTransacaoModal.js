import React, { useState, useEffect } from 'react';
import { Form, Modal, Button, Row, Col } from 'react-bootstrap';
import tipos from './TiposDeTransacao';
import { useUser } from '../../../contexts/UserContext';
import API from '../../../utils/API';

export default function NovaTransacaoModal({ mostrarModalNovaTransacao, handleCloseNovaTransacao }) {
    const { user } = useUser();

    const [validated, setValidated] = useState(false);
    const [tipo, setTipo] = useState(tipos.ADICAO);
    const [accounts, setAccounts] = useState([]);
    const [selectedAccountId, setSelectedAccountId] = useState({});
    const [valor, setValor] = useState(0);
    const [dataDeCriacao, setDataDeCriacao] = useState(new Date());

    const onTipoChanged = event => {
        setTipo(event.currentTarget.value)
    };

    useEffect(() => {
        API.defaults.headers.authorization = `Bearer ${user.token}`;
        API.get(`/wallets/${user.walletId}/accounts`)
            .then(response => {
                console.log(response);
                setAccounts(response.data);
            });
    }, []);
    
    const onSubmitLancar = event => {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
            return;
        }
        console.log(form);

        event.preventDefault();
        setValidated(false);
        API.post(`/wallets/${user.walletId}/accounts/${selectedAccountId}/transaction`, {
            type: tipo,
            amount: parseFloat(valor),
            dataDeCriacao,
            accountId: user.accountId
        })
        .then(resultado => {
            handleCloseNovaTransacao();
        });
    };

    const selectAccountsOptions = () => accounts.map((account, index) => (
        <option value={account.id}>
            {account.name}
        </option>   
    ));

    const onChangeAccount = (account) => {
        console.log(account);
        setSelectedAccountId(account);
    };
    return (
        <>
            <Modal show={mostrarModalNovaTransacao} onHide={handleCloseNovaTransacao}>
                <Modal.Header closeButton>
                    <Modal.Title>Nova Transação</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={onSubmitLancar}>
                    <Modal.Body>
                        <Form.Group controlId="formBasicLogin">
                            <Form.Label>Valor</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                placeholder="Valor"
                                value={valor}
                                onChange={e => setValor(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Valor inválido
                        </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formBasicLogin">
                            <Form.Label>Data de Criação</Form.Label>
                            <Form.Control
                                required
                                type="date"
                                placeholder="Data de Criação"
                                value={dataDeCriacao}
                                onChange={e => setDataDeCriacao(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Data de Criação inválida
                        </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control as="select" onChange={e => onChangeAccount(e.target.value)} >
                            <option value=""></option>
                            {
                                accounts.length === 0 ? null : selectAccountsOptions() 
                            }
                            </Form.Control>
                        </Form.Group>
                        <fieldset>
                            <Form.Group as={Row}>
                                <Form.Label as="legend" column sm={2}>
                                    Tipo
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Check
                                        type="radio"
                                        label="Adição"
                                        name="formHorizontalTipoRadios"
                                        id="formHorizontalRadioAdicao"
                                        value={tipos.ADICAO}
                                        checked={tipo == tipos.ADICAO}
                                        onChange={onTipoChanged}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Subtração"
                                        name="formHorizontalTipoRadios"
                                        id="formHorizontalRadioSubtracao"
                                        value={tipos.SUBTRACAO}
                                        checked={tipo == tipos.SUBTRACAO}
                                        onChange={onTipoChanged}
                                    />
                                </Col>
                            </Form.Group>
                        </fieldset>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">
                            Salvar
                    </Button>
                        <Button variant="danger" onClick={handleCloseNovaTransacao}>
                            Fechar
                    </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}
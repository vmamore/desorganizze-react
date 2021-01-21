import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import NovaTransacaoModal from './NovaTransacao/NovaTransacaoModal'
import { useUser } from '../../contexts/UserContext';
import API from '../../utils/API';
import './Transacoes.css';

export default function Transacoes() {
    const [modalNovaTransacao, setmodalNovaTransacao] = useState(false);
    const [transacoes, setTransacoes] = useState([]);

    const { user } = useUser();
    const handleFecharModalNovaTransacao = () => setmodalNovaTransacao(false);
    const handleAbrirModalNovaTransacao = () => setmodalNovaTransacao(true);

    useEffect(() => {
        API.defaults.headers.authorization = `Bearer ${user.token}`;
        API.get(`wallets/${user.walletId}/transactions`).then(response => {
                setTransacoes(response.data);
            });
    }, []);

    const transacoesRow = () => transacoes.map((transacao, index) => (
        <tr key={index}>
            <td>
                { index + 1}
            </td>
            <td>
                {transacao.accountName}
            </td>
            <td>
                {transacao.type}
            </td>
            <td>
                {transacao.createdDate}
            </td>
            <td>
                {transacao.amount}
            </td>
        </tr>
    ));

    return (
        <Container className="mt-3">
            <Button variant="success" onClick={handleAbrirModalNovaTransacao}>Nova Transação</Button>
            <Table striped bordered hover size="sm" className="mt-2">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome da Conta</th>
                        <th>Tipo</th>
                        <th>Data de Criação</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                {
                   transacoes.length === 0 ? null : transacoesRow() 
                }
                </tbody>
            </Table>
            <NovaTransacaoModal 
                mostrarModalNovaTransacao={modalNovaTransacao} 
                handleCloseNovaTransacao={handleFecharModalNovaTransacao} />
        </Container>
    );
};
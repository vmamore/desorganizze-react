import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useUser } from '../../contexts/UserContext';
import API from '../../utils/API';

export default function Transacoes() {
    const [modalNovaConta, setmodalNovaConta] = useState(false);
    const [accounts, setAccounts] = useState([]);

    const { user } = useUser();
    const handleFecharModalNovaConta = () => setmodalNovaConta(false);
    const handleAbrirModalNovaConta = () => setmodalNovaConta(true);

    useEffect(() => {
        API.defaults.headers.authorization = `Bearer ${user.token}`;
        API.get(`wallets/${user.walletId}/accounts`)
            .then(response => {
                setAccounts(response.data);
            });
    }, []);

    const accountsRow = () => accounts.map((account, index) => (
        <tr key={index}>
            <td>
                { index + 1}
            </td>
            <td>
                {account.name}
            </td>
            <td>
                {account.totalAmount}
            </td>
        </tr>
    ));

    return (
        <Container className="mt-3">
            <Button variant="success" onClick={handleAbrirModalNovaConta}>Nova Conta</Button>
            <Table striped bordered hover size="sm" className="mt-2">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome da Conta</th>
                        <th>Saldo atual</th>
                    </tr>
                </thead>
                <tbody>
                {
                    accounts.length === 0 ? null : accountsRow() 
                }
                </tbody>
            </Table>
        </Container>
    );
};
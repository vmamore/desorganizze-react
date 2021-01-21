import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useUser } from '../../../contexts/UserContext';
import Transacoes from '../../Transacoes/Transacoes';
import Contas from '../../Contas/Contas';

function MyNavbar() {
    const { user } = useUser();

    return (
        <div>
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="#home">Desorganizze</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link>
                        <Link to="/transacoes">Transações</Link>
                    </Nav.Link>
                    <Nav.Link href="contas">
                        <Link to="/contas">Contas</Link>
                    </Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link>
                        {<div>
                            <FontAwesomeIcon icon={faUser} style={{ marginRight: '10px' }} /> Olá {user.name}!
                        </div>}
                    </Nav.Link>
                    <Nav.Link>
                        <FontAwesomeIcon icon={faUser} style={{ marginRight: '10px' }} /> Sair
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        <Switch>
            <Route path='/transacoes' component={Transacoes} />
            <Route path='/contas' component={Contas} />
        </Switch>
        </div>
    );
}

export default MyNavbar;
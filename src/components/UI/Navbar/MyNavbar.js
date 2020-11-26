import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useUser } from '../../../contexts/UserContext';

function MyNavbar() {
    const { user } = useUser();

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="#home">Desorganizze</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {/* <Nav.Link href="#home">Extrato</Nav.Link>
                    <Nav.Link href="contas">
                        <Link to="/contas">Contas</Link>
                    </Nav.Link> */}
                </Nav>
                <Nav>
                    <Nav.Link>
                        {<div>
                            <FontAwesomeIcon icon={faUser} style={{ marginRight: '10px' }} /> Olá {user.username}!
                        </div>}
                    </Nav.Link>
                    <Nav.Link>
                        <FontAwesomeIcon icon={faUser} style={{ marginRight: '10px' }} /> Sair
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default MyNavbar;
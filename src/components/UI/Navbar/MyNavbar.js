import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import NewUser from '../../NewUser/NewUser';
import Login from '../../Login/Login';

function MyNavbar({ authenticated, username, handleAcessarShow, handleRegistrarShow }) {
    const [showNewUserModal, setShowNewUserModal] = useState(false);

    const handleNewUserModalClose = () => setShowNewUserModal(false);
    const handleNewUserModalShow = () => setShowNewUserModal(true);

    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleLoginModalClose = () => setShowLoginModal(false);
    const handleLoginModalShow = () => setShowLoginModal(true);

    return (
        <>
            <NewUser show={showNewUserModal} handleRegistrarClose={handleNewUserModalClose} />
            <Login show={showLoginModal} handleLoginClose={handleLoginModalClose} />

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
                            {authenticated ?
                                <div>
                                    <FontAwesomeIcon icon={faUser} style={{ marginRight: '10px' }} />
                        Olá {username}!
                    </div> :
                                <Button variant="success" onClick={handleLoginModalShow}>
                                    Acessar
                    </Button>
                            }
                        </Nav.Link>
                        <Nav.Link>
                            {authenticated ?
                                null :
                                <Button variant="primary" onClick={handleNewUserModalShow}>
                                    Registrar
                    </Button>
                            }
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default MyNavbar;
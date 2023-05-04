import React from 'react';
import {Button} from 'react-bootstrap';
import { Link } from "react-router-dom";

export const UserInfo = ({email, username, handleDeregister}) =>{
    return(
    <>
    <h4>Account Information</h4>
    <p>Name: {username}</p>
    <p>E-mail: {email}</p>
        <Link to="/signup">
        <Button variant="link" style={{ color: "red", marginLeft: 50 }} onClick={handleDeregister}> Delete account </Button> 
        </Link>
    </>
    );
};
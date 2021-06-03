import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import decode from 'jwt-decode';

function withAuth(AuthComponent, props) {

    return function AuthWrapped(props) {
        const history = useHistory();
        const token = localStorage.getItem('token');
        
        useEffect(() => {
            const logout = () => {
                localStorage.removeItem('token');
                props.setData({
                    token: null,
                    user: null,
                    currentData: null,
                    totalMoney: [],
                    monthGoal: [],
                    expenses: [],
                });
                history.push('/')
            }
            if (token !== null) {
                const decoded = decode(token);
                if(decoded.exp < Date.now() / 1000) {
                        logout();
                } 
            } 
        })

        if (token !== null) {
            return <AuthComponent {...props}/>
        } else {
            return null;
        }
    }
}

export default withAuth;
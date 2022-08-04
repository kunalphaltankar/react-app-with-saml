import axios from 'axios';
import React, { useEffect, useState } from 'react';
import logging from './config/logging';

export interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = (props) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [email, setEmail] = useState<string>('');

    const RedirectToLogin = () => {
        window.location.replace('https://localhost:1337/login');
    };

    useEffect(() => {
        logging.info('Initiating SAML check.', 'SAML');

        axios({
            method: 'GET',
            url: 'https://localhost:1337/whoami',
            withCredentials: true
        })
            .then((response) => {
                logging.info(response.data.user, 'SAML');

                if (response.data.user.nameID) {
                    setEmail(response.data.user.nameID);
                    setLoading(false);
                } else {
                    RedirectToLogin();
                }
            })
            .catch((error) => {
                logging.error(error, 'SAML');
                RedirectToLogin();
            });
    }, []);

    if (loading) return <p>loading ...</p>;

    return <p>Hello {email}!</p>;
};

export default Application;

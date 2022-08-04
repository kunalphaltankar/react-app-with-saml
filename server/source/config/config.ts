import secret from './secret';

const config = {
    saml: {
        entryPoint: secret.saml.entryPoint, // SAML request URL
        cert: secret.saml.cert, // IDP public certificate
        issuer: secret.saml.issuer, // Entity Id
        options: {
            failureRedirect: '/login',
            failureFlash: true
        }
    },
    server: {
        port: 1337
    },
    session: {
        resave: false,
        secret: 'supersecretamazingpassword',
        saveUninitialized: true
    }
};

export default config;

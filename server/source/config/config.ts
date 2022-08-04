const config = {
    saml: {
        entryPoint: '', // SAML request URL
        cert: '', // IDP public certificate
        issuer: '', // Entity Id
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

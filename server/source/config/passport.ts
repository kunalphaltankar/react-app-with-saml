import fs from 'fs';
import passport from 'passport';
import { SamlConfig, Strategy } from 'passport-saml';
import config from './config';
import logging from './logging';

const savedUsers: Express.User[] = [];

passport.serializeUser<Express.User>((expressUser, done) => {
    logging.info(expressUser, 'Serialize User');
    done(null, expressUser);
});

passport.deserializeUser<Express.User>((expressUser, done) => {
    logging.info(expressUser, 'Deserialize User');

    done(null, expressUser);
});

const options: SamlConfig = {
    issuer: config.saml.issuer, // Entity Id from IDP
    protocol: 'https://',
    path: '/login/callback', // ACS callback URL
    entryPoint: config.saml.entryPoint, // Service Provider (SP) initiated Login URL
    cert: fs.readFileSync(config.saml.cert, 'utf-8') // IDP SAML certificate
};

passport.use(
    new Strategy(options, (expressUser: any, done: any) => {
        if (!savedUsers.includes(expressUser)) {
            savedUsers.push(expressUser);
        }

        return done(null, expressUser);
    })
);

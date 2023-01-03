/**
 * Main application routes
 */
import errors from './components/errors';
import path from 'path';
import * as users from './api/users';


export default function(app) {
// Custom API routes go here
    app.use('/api/users', users.router);
    // All undefined asset or api routes should return a 404
    app.route('/:url(api|auth|components|app|bower_components|assets)/*')
        .get(errors[404]);
    // All other routes should redirect to the app.html
    app.route('/*')
        .get((req, res) => {
            res.sendFile(path.resolve(`${app.get('appPath')}/app.html`));
        });
}
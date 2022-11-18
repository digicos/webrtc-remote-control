const express = require('express');
const { ExpressPeerServer } = require('peer');
const app = express();
const fs = require('fs');
var https = require('https');

app.enable('trust proxy');

var sslOptions = {
    key: fs.readFileSync('./ssl/nginx-selfsigned.key'),
    cert: fs.readFileSync('./ssl/nginx-selfsigned.crt')
};

const PORT = process.env.PORT || 9000;
// const server = app.listen(PORT, () => {
//     console.log(`App listening on port ${PORT}`);
//     console.log('Press Ctrl+C to quit.');
// });
const server =  https.createServer(sslOptions, app).listen(9000)

const peerServer = ExpressPeerServer(server, {
    path: '/',
    ssl: sslOptions
});

app.use(express.static('public'))
app.use('/peerjs', peerServer);

module.exports = app;
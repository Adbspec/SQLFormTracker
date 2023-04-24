const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const apiRoutes = require('./routes/api.routes');
const cors = require('cors');
const { host } = require('./config/db.config');
const helmet = require('helmet');
app.use(cors(
    {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }
));

app.use(helmet());
app.use(express.json());

app.use('/api', apiRoutes);


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


const PORT = process.env.PORT || 8086;

http.listen(PORT, () => {
    console.log(`Server is running on {PORT}`);
});

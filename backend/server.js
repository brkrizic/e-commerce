import http from 'http';
import app from './app/app.js';
import 'dotenv/config';
import { Server as SocketIO } from "socket.io";
import fs from 'fs';
import https from 'https';
import { fileURLToPath } from "url";
import path from "path";

/*// Fix __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Correct Path Construction
const options = {
  key: fs.readFileSync(path.join(__dirname, "certs", "private_key.key")),
  cert: fs.readFileSync(path.join(__dirname, "certs", "sslcert.crt")),
};*/

//create the server
const PORT = process.env.PORT || 3002;
const server = http.createServer(/*options,*/ app);
server.listen(PORT, console.log(`Server is up and running on port ${PORT}`));

const io = new SocketIO(server);

export { io };

io.on('connection', (socket) => {
    console.log("A user connected");

    socket.on('disconnect', () => {
        console.log('User disconnected');
    })
})
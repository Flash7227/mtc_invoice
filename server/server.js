process.removeAllListeners('warning'); //sequelize oracle error hiding

const express = require('express')
const dotenv = require("dotenv").config()
const cors = require("cors");
const morgan = require('morgan');
var path = require('path')
var rfs = require('rotating-file-stream');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);

// create a rotating write stream
var accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'logs')
})


app.use(morgan('combined', { stream: accessLogStream }))
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
//morgan for logger

const sequelize = require("./config/db"); //initilizing db
(async () => {
  const User = require('./models/User');
  await sequelize.sync();
  console.log("Models synced with database");
})();


app.get('/', (req, res) => {
  res.send('ENDPOINT IS ON.')
});

const Auth = require("./routes/Auth");
const Cust = require("./routes/Cust");
const Base = require("./routes/Base");
const Invoice = require("./routes/Invoice");
const Payment = require("./routes/Payment");
// const Subs = require("./routes/subs")

app.use("/auth", Auth);
app.use("/cust", Cust);
app.use("/base", Base);
app.use("/invoice", Invoice);
// app.use("/subs", Subs);
app.use("/payment", Payment);

//ws section
const wss = new WebSocket.Server({ noServer: true });
server.on('upgrade', (request, socket, head) => {
  const { url } = request;
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request, url);
  });
});

wss.on('connection', (ws, request, url) => {
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message); // Parse the incoming message as JSON
      const SocketAction = require('./controllers/SocketAction');
      SocketAction.handleWebSocket(ws, request, url, data);
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });
  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});
//ws ends

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server is started on port ${port}`);
});

module.exports = { app, server }; 


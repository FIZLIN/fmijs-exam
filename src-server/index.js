const express = require('express');
const cors = require('cors');
const psList = require('ps-list');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');

io.on('connection', function (socket) {
  console.log('a user connected');
  setTimeout(() => io.send('sample message'), 1000);
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});

async function checkProcess() {
  const data = await psList();
  console.log(data);
}
checkProcess();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

const port = 8082;
server.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});

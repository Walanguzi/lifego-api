const socketio = require('socket.io');

module.exports = ({ app, server }) => {
  const socket = socketio(server, { pingTimeout: 30000 });

  app.set('socket', socket);
};

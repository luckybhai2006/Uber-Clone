const socketIo = require('socket.io');
const userModel = require('./models/user.models');
const captionModel = require('./models/caption.model');

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: [ 'GET', 'POST' ]
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);


        socket.on('join', async (data) => {
            try {
                const { userId, userType } = data;
                console.log(`User ${userId} joined as ${userType}`);
                // console.log(socket.id);

                if (userType === 'user') {
                     await userModel.findByIdAndUpdate(userId, { socketId: socket.id });

                    // console.log('User update result:', result); // Log the result for debugging

                } else if (userType === 'captain') {
                     await captionModel.findByIdAndUpdate(userId, { socketId: socket.id })

                    // console.log('Captain update result:', result); // Log the result for debugging
                    
                } else {
                    console.error('Invalid userType:', userType);
                }
            } catch (error) {
                console.error('Error updating socketId:', error.message);
            }
        });
        


        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;

            if (!location || !location.ltd || !location.lng) {
                return socket.emit('error', { message: 'Invalid location data' });
            }

            await captionModel.findByIdAndUpdate(userId, {
                location: {
                    ltd: location.ltd,
                    lng: location.lng
                }
            });
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}

const sendMessageToSocketId = (socketId, messageObject) => {

console.log(`sending message to ${socketId}`, messageObject);

    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log('Socket.io not initialized.');
    }
}

module.exports = { initializeSocket, sendMessageToSocketId };
SlideParty-js
==================
- Presenter has a slide presentation in front of a live audience
- The presenter can use mobile device to control main slide presentation
- The presenter can share a poll with the audience
- The audience uses their mobile devices to enter feedback
- Data is collected and appears real-time on the slide presentation

npm install & requires
==================
- express
- socket.io
- mongoose
- underscore

Socket.io
==================
Listens for changes and emits a callback between server-client and client-server.

Server-Client interaction:
==================
1. Server waits for clients to emit 'direction' (server.js)
2. Client emits 'direction' and data in slides.js to server
3. Server takes data and emits it to all clients via 'directionSuccess'
4. Clients wait for 'directionSuccess' in client.js
5. When Clients receive 'directionSuccess' data, trigger changeSlide in slides.js



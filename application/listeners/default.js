
var Routes = require(global.SYSTEM_PATH('core/Routing_listener'))

console.log('Listening... OK')


global.io.on('connection', function(socket) {
    var onevent = socket.onevent;

    // JOIN ROOM
    socket.join(socket.handshake.query.cluster)

    socket.onevent = function (packet, callback) {
        var args = packet.data || [];
        onevent.call (this, packet, callback);    // original call
        packet.data = ["*"].concat(args);
        onevent.call(this, packet, callback);      // additional call to catch-all
    };


   socket.on('*', function(event, data, callback) {
        var nEvent = event.split('/');
        nEvent = nEvent.filter(function(res){return res != ''})
        nEvent = nEvent.join('/');
        var RTS = global.RTR.parse_routing(nEvent);
        var CTR = global.load_class(RTR.class, global.APPLICATION_PATH('controllers'));
        if(CTR)
        {
            var CTR = global.load_controller(RTS.file)
            if(typeof CTR[RTS.function] == 'function')
            {
                CTR[RTS.function](event, data, callback)
            }
        }else
        {
            var room = data._props.apiKey;
            var event = room+'_'+event
            io.to(room).emit(event, data.data);
        }

    })

    socket.on('disconnect', () => console.log('Client disconnected'));
})
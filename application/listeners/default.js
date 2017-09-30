
var Routes = require(global.SYSTEM_PATH('Routing_listener'))

console.log('Listening... OK')
global.io.on('connection', function(socket) {
    var onevent = socket.onevent;

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
        }

        data = data.data
        if(data.type)
        {
            switch(data.type)
            {
                case "PEER":
                console.log(event, data)
                    socket.emit(event, data.data);
                    break;
            }
        }

    })

    socket.on('disconnect', () => console.log('Client disconnected'));
})
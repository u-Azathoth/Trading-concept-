import equities from '../src/equities';
import futures from '../src/futures';
import options from '../src/options';
import debt from '../src/debt';

class EventHandler {
    constructor(socket, io) {
        this.socket = socket;

        this.initEvents();
    }

    initEvents() {
        this.socket
            .on('room', this.roomHandler.bind(this))

            .on('futures', this.futuresHandler.bind(this))
            .on('options', this.optionsHandler.bind(this))
            .on('debt', this.debtHandler.bind(this))
            .on('equities', this.equitiesHandler.bind(this));
    }

    roomHandler(room) {
        this.socket.leave(this.socket.room);
        this.socket.join(room);

        console.log(`Person joined to ${room} room`);
    }

    futuresHandler() {
        futures.getData().then(futuresData => {
            this.socket.emit('_futures', futuresData);
        })
    }

    optionsHandler() {
        options.getData().then(optionsData => {
            this.socket.emit('_options', optionsData);
        })
    }

    debtHandler() {
        debt.getData().then(debtData => {
            this.socket.emit('_debt', debtData);
        })
    }

    equitiesHandler() {
        equities.getData().then(equitiesData => {
            this.socket.emit('_equities', equitiesData);
        })
    }
}

export default EventHandler;
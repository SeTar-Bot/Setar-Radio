const WebSocket = require("ws");
const { EventEmitter } = require("events");

module.exports = class RadioStation extends EventEmitter {
    #Radio;
    #ws;
    #reconnect = true;
    constructor(url, reconnect)
    {
        super();
        if(url)
            this.#Radio = `wss://${url}`;
        if(reconnect)
            this.#reconnect = reconnect;
    }

    connect() {
        this.#ws = new WebSocket(this.#Radio);
        this.#ws.on("open", () => this.emit("ready"));
        this.#ws.on("message", (msg) => this.emit("music", msg));
        this.#ws.on("close", () => {
            if(this.#reconnect)
                this.connect();
        });
    }

    
}
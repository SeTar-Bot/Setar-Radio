module.exports = (con) => {

    const Dispatcher = con.play("https://fzbotcs.herokuapp.com/");
    
    Dispatcher.on("finish", () => {
        Dispatcher.destroy();
        module.exports(con);
    });

    Dispatcher.on("error", (e) => {
        Dispatcher.destroy();
        module.exports(con);
    });

};
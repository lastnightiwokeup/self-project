"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import logger from '../utilities/logger';
// import * as config from '../utilities/config';
const http_1 = __importDefault(require("http"));
function startServer(expressApp) {
    /**
     * Create HTTP server.
     */
    //   logger.debug('Initializing http lisener...');
    const server = http_1.default.createServer(expressApp);
    //   logger.debug('Initializing http lisener completed.');
    /**
     * Listen on provided port, on all network interfaces.
     */
    server.listen(3000);
    server.on('error', onError);
    server.on('listening', onListening);
    /**
     * Event listener for HTTP server "error" event.
     */
    function onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }
        const bind = typeof 3000 === 'string'
            ? 'Pipe ' + 3000
            : 'Port ' + 3000;
        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }
    /**
     * Event listener for HTTP server "listening" event.
     */
    function onListening() {
        const addr = server.address();
        const bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + (addr === null || addr === void 0 ? void 0 : addr.port);
        // logger.info('Listening on ' + bind);
    }
}
exports.default = startServer;
//# sourceMappingURL=http.js.map
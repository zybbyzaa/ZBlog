import path from 'path'
import bunyan from 'bunyan'
import config from '../../config'

export const logger = bunyan.createLogger({
    name: 'zblog',
    serializers: {
        req: bunyan.stdSerializers.req,
        res: bunyan.stdSerializers.res,
        err: bunyan.stdSerializers.err
    },
    streams: [{
        level: 'info',
        stream: process.stdout
    }, {
        type: 'rotating-file',
        level: 'error',
        path: path.join(config.root, 'logs/' + config.env + '-' + 'error.log'),
        period: '1d',
        count: 7
    }]
})

export function createLoggerMiddle() {
    return function *(next) {
        this.logger = logger
        yield next
    }
}

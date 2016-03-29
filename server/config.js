import path from 'path'

const config = {
    env: process.env.NODE_ENV,
    root: path.normalize(__dirname + '/..'),
    port: 8089,
    host: 'localhost',
    db: {
        url: 'mongodb://http://192.168.1.241:27017/zblog'
    },
    session: {
        secrets: 'Zblog-secret',
        cookie: {
            maxage: 2 * 3600 * 1000
        }
    },
    github: {
        clientID: 'f1e112b810375ed8066a',
        clientSecret: '11e1102de4e95cb58805a4512b4ea098671d9366',
        callbackURL: 'http://localhost:8089/api/auth/github/callback'
    }
}

export default config

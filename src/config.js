
let baseURL
let baseWsURL
const env = process.env.NODE_ENV

if (env === 'development') {
    baseURL = 'http://192.168.1.117:3100'
    baseWsURL = 'ws://192.168.1.117:3101'
    // baseURL = 'http://localhost:3100'
    // baseWsURL = 'ws://localhost:3101'
    //  baseURL = 'https://streetmusic.migaox.com'
    //  baseWsURL = 'wss://streetmusicws.migaox.com'
} else {
    baseURL = 'https://streetmusic.migaox.com'
    baseWsURL = 'wss://streetmusicws.migaox.com'
}



module.exports = {
    baseURL, baseWsURL
}
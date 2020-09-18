
let baseURL
let baseWsURL
const env = process.env.NODE_ENV

if (env === 'development') {
    // baseURL = 'http://192.168.1.117:3100'
    baseURL = 'https://streetmusic.migaox.com'
    baseWsURL = 'wss://streetmusicws.migaox.com'
    // baseWsURL = 'ws://192.168.1.117:3101'
} else {
    baseURL = 'https://streetmusic.migaox.com'
    baseWsURL = 'wss://streetmusicws.migaox.com'
}



module.exports = {
    baseURL, baseWsURL
}
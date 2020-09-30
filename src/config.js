
let baseURL
let baseWsURL
const env = process.env.NODE_ENV

if (env === 'development') {
    baseURL = 'http://192.168.1.120:3100'
    baseWsURL = 'ws://192.168.1.120:3101'
    // baseURL = 'https://streetmusic.migaox.com'
    // baseWsURL = 'wss://streetmusicws.migaox.com'
} else {
    baseURL = 'https://streetmusic.migaox.com'
    baseWsURL = 'wss://streetmusicws.migaox.com'
}



module.exports = {
    baseURL, baseWsURL
}
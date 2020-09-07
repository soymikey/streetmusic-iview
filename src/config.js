
let baseURL

const env = process.env.NODE_ENV

if (env === 'development') {
    baseURL = 'http://192.168.1.117:3000'
}



module.exports = {
    baseURL
}
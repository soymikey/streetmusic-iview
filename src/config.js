
let baseURL

const env = process.env.NODE_ENV

if (env === 'development') {
    baseURL = 'http://localhost:3000'
}



module.exports = {
    baseURL
}
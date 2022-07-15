const sendResponse = (hapi, message, code) => {
    return hapi.response(message).code(code)
}

module.exports = {
    sendResponse
}
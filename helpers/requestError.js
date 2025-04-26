const def={
    400: "Bad request",
    404: "Not Found",
    409: "Conflicting Request",
    500: "Internal Server Error"
}


const RequestError = (status, message=def[status]) => {
    const error = new Error(message);
    error.status = status;
    return error;
}

module.exports = RequestError;
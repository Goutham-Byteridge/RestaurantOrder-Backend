global.errorTypes = { 
    "validation" : 1,
    "unauthorized" : 2
}

global.errorHandler = (err, res) => {
    switch (true) {
        case typeof err === 'string':
            // custom application error
            const is404 = err.toLowerCase().endsWith('not found');
            const statusCode = is404 ? 404 : 400;
            return res.status(statusCode).json({ message: err });
        case err.name === global.errorTypes.validation:
            // validation error
            return res.status(400).json({ message: err.message });
        case err.name === global.errorTypes.unauthorized:
            // jwt authentication error
            return res.status(401).json({ message: err.message });
        default:
            return res.status(500).json({ message: err.message });
    }
}
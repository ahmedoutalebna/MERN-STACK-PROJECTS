const notFound = async(req, res, next) =>
{    
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

const errorHandler = async(err, req, res, next)=>{
    let status = res.statusCode === 200 ? 500 : res.statusCode 
    let message = err.message
    console.log('error name ', err.name)
    console.log('error kind ', err.kind)
    if(err.name === 'CastError' && err.kind === 'ObjectId')
    {
        status = 404
        message = 'Ressource not found'
    }
    res.status(status).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack 
    })
}

module.exports = {notFound, errorHandler}


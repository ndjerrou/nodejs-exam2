module.exports = (req,res,next) =>{
    
    //a faire
    if(!req.authentication)
    {
        return res.status(500).send({ ok: false, msg: 'Authentification failed' });
    }
    next();
};
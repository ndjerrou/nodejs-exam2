module.exports = (req,res,next) =>{

    console.log("User has sent: ");
    console.log(req.body);
    console.log("From: ");
    console.log(req.rawHeaders);
    console.log("Type of request: ");
    console.log(req.method);
    next();
};
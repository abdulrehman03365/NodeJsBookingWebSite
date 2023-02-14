
const db=require('../model')
const Roles=db.Roles;
const user=db.user;
const flash=require('connect-flash-plus')
checkEmptyfields=(req,res,next)=>{


    if (!req.body.username )
    {

       
        return

    }


    if (!req.body.password)
    {
        
    }


    if (!req.body.ema)
    {
        
    }

 next()
}




checkDuplicateUser= (req,res,next)=>{
 user.find({'name':req.body.username}
,function(err,result){

    if (err)
    {
        res.status(400).send({message:{err}})
    return;
    }

    console.log(result);
    if (result.length!=0)
    {

        res.status(500).send({message:'Failed ! username already exist'});
        return ;
    }

    next()


})
}


checkDuplicateEmail= (req,res,next)=>{
    user.find({'email':req.body.email}, function(err,result){

if(err)
{
res.status(500).send({message : err.message})
return;
}

console.log(result);
if (result.length!=0)

res.status(400).send({error :"Failed ! email already exist"})
return ;
})


next()

}




verifyRolesExist=  (req,res,next)=>{
    if(req.body.roles)
{
    for (var i =0; i<req.body.roles.length ; i++)
    {
        if (!Roles.includes(req.body.roles[i]))
        {

            res.status(400).send(`Role ${req.body.roles[i]} does not exist`)
            return ;
        }


    }
}
    next()



    }

    module.exports={
        checkDuplicateEmail,
        checkDuplicateUser,
        checkEmptyfields
    }
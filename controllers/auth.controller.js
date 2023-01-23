const db = require('../model');
const user=require('../model/user.model')
const role=require('../model/role.model');
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

signUpController=(req,res,next)=>{

const myPass=req.body.password
bcrypt.genSalt(10,(err,salt)=>{
if(err)
{
    console.log(err);
    res.status(500).send({"message":err.message})
    return;
}

        bcrypt.hash(myPass,salt, function(err,hash){
            if(err)
            {
                console.log(err);
                res.status(500).send({"message":err.message})
                return;
            }
            
            enc_pass=hash
        })
    })
    


const user = new user( 
{
    name : req.body.username,
    email: req.body.email,
    password : enc_pass
}

)



    db.user.create(function(err,user){
        if (err)
        {
            console.log(err);
            res.status(500).send({"message":err.message})
            return;
        }


        if (req.body.roles)
        {

            role.find({name:{$in :req.body.roles}},function(err,roles){
                if(err)
                {
                    console.log(err);
                    res.status(404).send({'message':"Roles does not exist"})
                }

                
                
                user.roles=roles.map((role)=>{role._id})
                user.save(function(err,result){
                    
                    if(err)
                    {
                            console.log(err)
                            res.status(500).send({"message":err})
                            return;
                    }
                    
                    else

                    {

                        res.status().send({"message":'User is created successfuly'})
                    }

                })

            })
        
        


            
        }

        else
        
        role.findOne({'name':"user"},function(err,res){
            if(err)
        {
            res.status(500).send({'message':err})
            console.log(err);

        }

        else
        {

            user.roles=[res._id]
            user.save((err)=>{
                if(err)
                {
                    res.status(500).send({'message':err})
                }
            
            else

            {
                res.status(201).send({"message":"User is created successfully"})
            }
            
            })
            

        }

        })






    })






}
signInController =(req,res,next)=>{

    user.findOne({'name':req.body.username},(err,user)=>{

        if (err)
        {
            res.status(500).send({'message':err})
        return;
        }

        else if (!user)
        {
            res.status(404).status('user does not exist')
        }

    })

    user.findOne({'email':req.body.email},(err,user)=>{
        if(err)
        {
            console.log(err);
            res.status(500).send({"message":err})
            return;
        }
        
        
        else
        {

            isValidPassword=bcrypt.compare(req.body.password,user.password)
            if(!isValidPassword)
            {

                res.status(401).send('invalid password is provided')
            }

            if(isValidPassword)
            {
               
             const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:60000})
               
               req.session.token=token
               var authorities =[]
               for(i=0 ;i<user.roles;i++)
               {
                authorities.push("Role_"+user.roles[i].name.toUpperCase())
               }
               res.status(200).send({'userId':userId,'authoroties':authorities,'authTocken':token})



            }
        }
    })

    
 

    

}


signOutController =(req,res,next)=>

{

try{
req.session.token=null;
res.status(200).send({'message':"User is created Succfully"})
}
catch(err)
{
res.status(500).send({'message':err})

}


}


module.exports={
  signInController,
  signOutController,
  signUpController
}
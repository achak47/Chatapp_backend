const router = require("express").Router() ;
const Conversation = require("../Models/Conversation");

//new conversations
router.post("/",(req,res)=>{
    var arr = [req.body.receiverId , req.body.senderId] ;
    Conversation.find({members:{ $all: [req.body.receiverId , req.body.senderId] }},(err,result)=>{
        if(result.length>0) res.status(200).json("Added Conversation") ;
        else{
            new Conversation({
                members:[req.body.senderId, req.body.receiverId]
            }).save((err,result)=>{
                if(err) throw err ;
                else res.status(200).json(result) ;
            }) ;
        }
    })

})
//get old conversations of an user
router.get("/:userId",async(req,res)=>{
    try{
        const conversation = await Conversation.find({
            members: {$in: [req.params.userId]}
        }) ;
      res.status(200).json(conversation) ;
    }
    catch(err){
        res.status(500).json(err) ;
    }
})
//get conversation using 2 User Ids
router.get("/find/:firstuserId/:seconduserId",async (req,res)=>{
    try{
    const conversation = await Conversation.findOne({
    members: { $all: [req.params.firstuserId,req.params.seconduserId]} ,
    });
    res.status(200).json(conversation) ;
   }
   catch(err){
       res.status(500).json(err) ;
   }
})
//to change the signal 
router.get("signal/:senderId/:receiverId", async (req,res)=>{
    try{
         
    }
    catch{
        res.status(500).json(err) ; 
    }
})
module.exports = router;
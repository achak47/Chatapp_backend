const router = require("express").Router() ;
const Conversation = require("../Models/Conversation");

//new conversations
router.post("/",async (req,res)=>{
   const result = await Conversation.findOne({members:{ $all: [req.body.receiverId , req.body.senderId] }})
        if(result) res.status(200).json("Added Conversation") ;
        else{
            new Conversation({
                members:[req.body.senderId, req.body.receiverId]
            }).save((err,result)=>{
                if(err) throw err ;
                else res.status(200).json(result) ;
            }) ;
        }

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
router.post("/signal", async (req,res)=>{
    const {senderId,receiverId,flag} = req.body ;
    try{
        const result = await Conversation.findOne({members:{ $all: [req.body.receiverId , req.body.senderId] }})
        if(result.members[0] == senderId)
        {
            result.signal[0] = flag ;
            await result.save() ;
        }
    }
    catch{
        res.status(500).json(err) ; 
    }
})
module.exports = router;
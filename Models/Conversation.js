const mongoose = require('mongoose') ;
const ConversationSchema = new mongoose.Schema({
   members:[String] ,
   signal:{
      type:[Number],
      default:[0,0]
   }
},
{
    writeConcern: {
       w: 'majority',
       j: true,
       wtimeout: 1000,
    } ,
    timestamps:true
}
)

module.exports = mongoose.model("Conversations",ConversationSchema);
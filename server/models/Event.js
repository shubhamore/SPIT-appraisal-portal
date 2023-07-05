const mongoose = require('mongoose')
const eventSchema = mongoose.Schema({
    
    date:{type:String,required:true},
    name:{ type : String, required:true},
    organizedBy:{ type : String, required:true},
    description:{ type : String, required:true},
},
{
    collection: 'Event'
})
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
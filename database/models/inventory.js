const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InventorySchema = new Schema({
    sku:{
        type: String,
        unique:true,
        required : true
    },
    type:{
        type: String,
        required: true
    },
    status:{
        type:String,
        enum: ['CREATED','PROCURED','SOLD'],
        required: true
    },
    location:{
        type: String,
        required: true
    },
    attributes:{
        brand:{
            type:String,
            required:true
        },
        model:{
            type:String,
            required:true
        },
        manufacturingYear:{
            type:Number,
            required:true
        }    
    },
    pricing:{
        cost:{
            type:Number,
            required:true
        },
        sellingPrice:{
            type:Number,
            required:true
        }
    },
    metadata:{
        created_at: { 
            type: Date, 
            default: Date.now 
        },
        updated_at: { 
            type : Date,
            default: Date.now 
        },
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', 
            required: true 
        },
        updated_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }
   
})


const inventoryModel = mongoose.model('Inventory', InventorySchema);
module.exports =  inventoryModel;

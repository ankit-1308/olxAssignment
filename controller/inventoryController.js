const InventoryModel = require("../database/models/inventory");

class InventoryData {
    constructor({sku,type,status,location,attributes,pricing,metadata}){
        this.sku=sku;
        this.type=type;
        this.status=status;
        this.location=location;
        this.attributes=attributes;
        this.pricing=pricing;
        this.metadata=metadata;
    }
}

class InventoryController{

    static createInventory = async(req,res,next)=>{
        try{
            const userId = req.user.user._id;
            const inventoryData = new InventoryData(req.body);

            if(!inventoryData.sku || !inventoryData.type || inventoryData.status || !inventoryData.location || !inventoryData.attributes || !inventoryData.pricing)
                return res.status(400).json({message:"All fields are required"});
            
            const newInventory = new InventoryModel(inventoryData);
            
            newInventory.metadata.created_by=userId;
            newInventory.metadata.updated_by=userId;

            const saveInventory = await newInventory.save();
            
            if(saveInventory)
                return res.status(200).json({message:"Created a new Inventory Successfully", createdInventory:newInventory});
            return res.status(500).json({messgae:"Failed to save inventory item"});
                
        }catch(error){
            next(error)
        }
        
    }
}

module.exports = InventoryController;
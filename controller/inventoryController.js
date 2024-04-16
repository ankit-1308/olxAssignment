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

            if(!inventoryData.sku || !inventoryData.type || !inventoryData.status || !inventoryData.location || !inventoryData.attributes || !inventoryData.pricing)
                return res.status(400).json({message:"All fields are required"});
            
            const newInventory = new InventoryModel(inventoryData);
            
            newInventory.metadata.created_by=userId;
            newInventory.metadata.updated_by=userId;

            const saveInventory = await newInventory.save();
            
            if(saveInventory)
                return res.status(200).json({message:"Created a new Inventory Successfully", createdInventory: saveInventory});
            return res.status(500).json({messgae:"Failed to save inventory item"});
                
        }catch(error){
            next(error)
        }
    }

    static getInventoryViaSku = async(req,res,next)=>{
        try{
            const inventory = await InventoryModel.findOne({sku:req.params.sku});
            if(!inventory)
                res.status(404).json({message:`Inventory not found with the provided sku ${req.params.sku}`});

            return res.status(200).json({message:"Inventory is fetched successfully",inventory:inventory});
            
        }catch(error){
            next(error)
        }
    }
    static updateInventory = async(req, res,next)=> {
        try {
            const { sku } = req.params;
            const userId = req.user.user._id;
            const {type,status,location,attributes,pricing} = req.body;
            
            const inventory = await InventoryModel.findOneAndUpdate(
            { sku },
            {
                type,
                status,
                location,
                attributes,
                pricing,
                $set: { 'metadata.updated_at':Date.now(), 'metadata.updated_by': userId }
            },
            { new: true }
            );

            if (!inventory) {
                return res.status(404).json({ error: 'Inventory not found' });
            }

            res.status(200).json({message :"Updated the inventory",updatedInventory:inventory});
        } catch (error) {
            console.error('Error updating inventory:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = InventoryController;

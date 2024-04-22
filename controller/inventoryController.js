const InventoryModel = require("../database/models/inventory");
const { v4: uuidv4 } = require('uuid');
const {INVALID_REQUEST_BODY, INVENTORY_SAVE_FAILED, MISSING_SKU_PARAM, INVENTORY_NOT_FOUND, INTERNAL_ERROR} = require("../errors/errorCodes");
const getError = require("../errors/index");
const {BAD_REQUEST, OK, INTERNAL_SERVER_ERROR,  NOT_FOUND} = require("../status-codes/status_codes");
class InventoryDTO {
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

    createInventory = async(req,res,next)=>{
        try{
            const userId = uuidv4();
            req.body.sku= uuidv4();
            const inventoryDTO = new InventoryDTO(req.body);

            if(!inventoryDTO.sku || !inventoryDTO.type || !inventoryDTO.status || !inventoryDTO.location || !inventoryDTO.attributes || !inventoryDTO.pricing)
                return res.status(BAD_REQUEST).json({message:getError(INVALID_REQUEST_BODY)});
            
            const newInventory = new InventoryModel(inventoryDTO);
            
            newInventory.metadata.created_by=userId;
            newInventory.metadata.updated_by=userId;

            const saveInventory = await newInventory.save();
            
            if(saveInventory)
                return res.status(OK).json({ createdInventory: saveInventory});
            return res.status(INTERNAL_SERVER_ERROR).json({messgae:getError(INVENTORY_SAVE_FAILED)});
                
        }catch(error){
            next(error)
        }
    }

    getInventories = async(req,res,next)=>{
        try{
            const inventories = await InventoryModel.find({});
            
            return res.status(OK).json({inventories:inventories});
            
        }catch(error){
            next(error)
        }
    }

    getInventoryViaSku = async(req,res,next)=>{
        try{
            const inventory = await InventoryModel.findOne({sku:req.params.sku});
            if(!inventory)
                res.status(NOT_FOUND).json({message:getError(MISSING_SKU_PARAM)});

            return res.status(OK).json({inventory:inventory});
            
        }catch(error){
            next(error)
        }
    }

    updateInventory = async(req, res,next)=> {
        try {
            const { sku } = req.params;
            const userId = uuidv4();
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
        
            if (!inventory){
                return res.status(NOT_FOUND).json({ error: getError(INVENTORY_NOT_FOUND) });
            }
 
            res.status(OK).json({updatedInventory:inventory});
        } catch (error) {
            console.error('Error updating inventory:', error);
            res.status(INTERNAL_SERVER_ERROR).json({ error: getError(INTERNAL_ERROR) });
        }
    }  
    deleteInventory = async(req, res, next)=>{
        try {
          const { sku } = req.params;
          const inventory = await InventoryModel.findOneAndDelete({ sku });
          if (!inventory) {
            return res.status(NOT_FOUND).json({ error: getError(INVENTORY_NOT_FOUND) });
          }
          res.json({ message: 'Inventory deleted successfully' });
        } catch (error) {
          console.error('Error deleting inventory:', error);
          res.status(INTERNAL_SERVER_ERROR).json({ error: getError(INTERNAL_ERROR) });
        }
      }
}

module.exports = InventoryController;

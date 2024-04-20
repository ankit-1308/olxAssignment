const router = require("express").Router();
const InventoryController = require("../controller/inventoryController.js");
const inventoryController = new InventoryController();
router.post("/create", inventoryController.createInventory);
router.get("/get-inventory/:sku", inventoryController.getInventoryViaSku);
router.put("/update-inventory/:sku", inventoryController.updateInventory);
router.delete("/delete-inventory/:sku", inventoryController.deleteInventory);
module.exports = router;  

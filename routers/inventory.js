const router = require("express").Router();
const InventoryController = require("../controller/inventoryController.js");

router.post("/create", InventoryController.createInventory);
router.get("/get-inventory/:sku", InventoryController.getInventoryViaSku);
router.put("/update-inventory/:sku", InventoryController.updateInventory)
module.exports = router;
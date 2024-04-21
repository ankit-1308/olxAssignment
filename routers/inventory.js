const router = require("express").Router();
const InventoryController = require("../controller/inventoryController.js");

const inventoryController = new InventoryController();
router.post("/", InventoryController.createInventory);
router.get("/", InventoryController.getInventories);
router.get("/:sku" , InventoryController.getInventoryViaSku)
router.put("/:sku", InventoryController.updateInventory);
router.delete("/:sku", InventoryController.deleteInventory);

module.exports = router;
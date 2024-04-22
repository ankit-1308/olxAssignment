const router = require("express").Router();
const InventoryController = require("../controller/inventoryController.js");

const inventoryController = new InventoryController();
router.post("/", inventoryController.createInventory);
router.get("/", inventoryController.getInventories);
router.get("/:sku" , inventoryController.getInventoryViaSku)
router.put("/:sku", inventoryController.updateInventory);
router.delete("/:sku", inventoryController.deleteInventory);

module.exports = router;

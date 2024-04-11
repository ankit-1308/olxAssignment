const router = require("express").Router();
const InventoryController = require("../controller/inventoryController");

router.post("/create", InventoryController.createInventory);

module.exports = router;
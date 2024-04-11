const assert = require('assert');

const InventoryModel = require("../database/models/inventory.js");
const InventoryController = require("../controller/InventoryController.js");

describe('InventoryController', () => {
    describe('createInventory', () => {
        it('should return 400 if any required field is missing', async () => {
            const req = {
                body: {}
            };
            const res = {
                status: function(code) {
                    assert.strictEqual(code, 400);
                    return this;
                },
                json: function(data) {
                    assert.strictEqual(data.message, "All fields are required");
                }
            };
            await InventoryController.createInventory(req, res);
        });

        it('should return 200 if inventory is created successfully', async () => {
            const req = {
                body: {
                    sku: "ABC123",
                    type: "Type",
                    status: "Status",
                    location: "Location",
                    attributes: "Attributes",
                    pricing: "Pricing",
                    metadata: {}
                },
                user: { user: { _id: "userId" } }
            };
            const res = {
                status: function(code) {
                    assert.strictEqual(code, 200);
                    return this;
                },
                json: function(data) {
                    assert.strictEqual(data.message, "Created a new Inventory Successfully");
                    assert.strictEqual(data.createdInventory.sku, req.body.sku);
                }
            };
            await InventoryController.createInventory(req, res);
        });
    });

    describe('getInventoryViaSku', () => {
        it('should return 404 if inventory with the provided SKU is not found', async () => {
            const req = {
                params: { sku: "nonExistingSku" }
            };
            const res = {
                status: function(code) {
                    assert.strictEqual(code, 404);
                    return this;
                },
                json: function(data) {
                    assert.strictEqual(data.message, "Inventory not found with the provided sku nonExistingSku");
                }
            };
            await InventoryController.getInventoryViaSku(req, res);
        });

        it('should return 200 if inventory with the provided SKU is found', async () => {
            const inventory = { sku: "ABC123", type: "Type", status: "Status", location: "Location", attributes: "Attributes", pricing: "Pricing", metadata: {} };
            InventoryModel.findOne = function() {
                return {
                    exec: function() {
                        return Promise.resolve(inventory);
                    }
                };
            };

            const req = {
                params: { sku: "ABC123" }
            };
            const res = {
                status: function(code) {
                    assert.strictEqual(code, 200);
                    return this;
                },
                json: function(data) {
                    assert.strictEqual(data.message, "Inventory is fetched successfully");
                    assert.deepStrictEqual(data.inventory, inventory);
                }
            };
            await InventoryController.getInventoryViaSku(req, res);
        });
    });
});

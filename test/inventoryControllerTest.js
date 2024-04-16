const sinon=require('sinon');
const assert = require('assert');

const InventoryModel = require("../database/models/inventory.js");
const InventoryController = require("../controller/inventoryController.js");

describe('InventoryController', () => {
    describe('getInventoryViaSku', () => {
        it('should return inventory if found with the provided SKU', async () => {
          const req = { params: { sku: 'SKU123' } };
          const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
          };
          const next = sinon.spy();
          const foundInventory = { _id: '123', sku: 'SKU123', type: 'Type A', status: 'CREATED', location: 'Location A', attributes: { key: 'value' }, pricing: { cost: 100, sellingPrice: 200 }, metadata: {} };
    
          sinon.stub(InventoryModel, 'findOne').resolves(foundInventory);
    
          await InventoryController.getInventoryViaSku(req, res, next);
    
          assert(res.status.calledWith(200));
          assert(res.json.calledWith({ message: 'Inventory is fetched successfully', inventory: foundInventory }));
    
          InventoryModel.findOne.restore();
        });
    
        it('should return 404 if inventory not found with the provided SKU', async () => {
          const req = { params: { sku: 'NonExistentSKU' } };
          const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
          };
          const next = sinon.spy();
    
          sinon.stub(InventoryModel, 'findOne').resolves(null);
    
          await InventoryController.getInventoryViaSku(req, res, next);
    
          assert(res.status.calledWith(404));
          assert(res.json.calledWith({ message: 'Inventory not found with the provided sku NonExistentSKU' }));
    
          InventoryModel.findOne.restore();
        });
    
        it('should call next with error if an error occurs during database query', async () => {
          const req = { params: { sku: 'SKU123' } };
          const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
          };
          const next = sinon.spy();
          const mockError = new Error('Database error');
    
          sinon.stub(InventoryModel, 'findOne').rejects(mockError);
    
          await InventoryController.getInventoryViaSku(req, res, next);
    
          assert(next.calledWith(mockError));
    
          InventoryModel.findOne.restore();
        });
      });
    });

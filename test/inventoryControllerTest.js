const sinon=require('sinon');
const assert = require('assert');

const InventoryModel = require("../database/models/inventory.js");
const InventoryController = require("../controller/inventoryController.js");

describe('InventoryController', () => {
  describe('createInventory', () => {
    it('should return 400 if required fields are missing', async () => {
      const req = {
        user: { user : {_id: '6618b2dc3e9bccc507404e98'}},
        body: {},
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };
      const next = sinon.spy();

      await InventoryController.createInventory(req, res, next);

      assert(res.status.calledWith(400));
      assert(res.json.calledWith({ message: 'All fields are required' }));
      assert(next.notCalled);
    });

   
    it('should create a new inventory successfully', async () => {
      const req = {
        user: { user: { _id: '6618b2dc3e9bccc507404e98' } },
        body: {
          sku: 'SKU123',
          type: 'type',
          status: 'CREATED',
          location: 'location',
          attributes: { brand: "Honda", model: "Verna", manufacturingYear: 2019 },
          pricing: { cost: 100, sellingPrice: 200 },
          metadata: {}, 
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };
      const next = sinon.spy();
      req.body.metadata.created_at = Date.now();
      req.body.metadata.updated_at = Date.now();
      req.body.metadata.created_by = req.user.user._id;
      req.body.metadata.updated_by = req.user.user._id;
      
      const createdInventory = {...req.body, _id : "1234"};
  
      sinon.stub(InventoryModel.prototype, 'save').resolves(createdInventory);
  
      await InventoryController.createInventory(req, res, next);

      
      assert(res.status.calledWith(200));
      assert(res.json.calledWith({ message: 'Created a new Inventory Successfully',createdInventory:createdInventory }));
      assert(next.notCalled);  
    
      assert(next.notCalled);
    });
  });
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

const sinon=require('sinon');
const assert = require('assert');

const { v4: uuidv4 } = require('uuid');
const {INVALID_REQUEST_BODY, INVENTORY_SAVE_FAILED, MISSING_SKU_PARAM, INVENTORY_NOT_FOUND, INTERNAL_ERROR} = require("../errors/errorCodes");
const errors = require("../errors/index.js");
const {BAD_REQUEST, OK,INTERNAL_SERVER_ERROR, NOT_FOUND} = require("../status-codes/status_codes");

const InventoryModel = require("../database/models/inventory.js");
const InventoryController = require("../controller/inventoryController.js");
const inventoryController = new InventoryController();
describe('InventoryController', () => {
  describe('createInventory', () => {
    it('should return 400 if required fields are missing', async () => {
      const req = {
        body: {},
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };
      const next = sinon.spy();

      await inventoryController.createInventory(req, res, next);

      assert(res.status.calledWith(BAD_REQUEST));
      assert(res.json.calledWith({message :errors(INVALID_REQUEST_BODY)}));
      assert(next.notCalled);
    });

   
    it('should create a new inventory successfully', async () => {
      const req = {
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
      req.body.metadata.created_by = uuidv4();
      req.body.metadata.updated_by = uuidv4();
      
      const createdInventory = {...req.body, _id : "1234"};
  
      sinon.stub(InventoryModel.prototype, 'save').resolves(createdInventory);
  
      await inventoryController.createInventory(req, res, next);

      
      assert(res.status.calledWith(OK));
      assert(res.json.calledWith({createdInventory:createdInventory }));
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
    
          await inventoryController.getInventoryViaSku(req, res, next);
    
          assert(res.status.calledWith(OK));
          assert(res.json.calledWith({inventory: foundInventory }));
    
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
    
          await inventoryController.getInventoryViaSku(req, res, next);
    
          assert(res.status.calledWith(NOT_FOUND));
          assert(res.json.calledWith({ message:errors(MISSING_SKU_PARAM) }));
    
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
    
          await inventoryController.getInventoryViaSku(req, res, next);
    
          assert(next.calledWith(mockError));
    
          InventoryModel.findOne.restore();
        });
      });
    });

const { INTERNAL_SERVER_ERROR } = require("../status-codes/status_codes");

module.exports = {
    // Common errors
    INVALID_REQUEST_BODY: 'E001',
    RESOURCE_NOT_FOUND: 'E002',
    DUPLICATE_SKU: 'E003',
    DATABASE_ERROR: 'E004',
    MISSING_SKU_PARAM: 'E005',
    INVALID_SKU_FORMAT: 'E006',

    UNKNOWN_ERROR: 'E007',
    // Errors for Create Inventory endpoint
    MISSING_REQUIRED_FIELDS: 'E008',
    INVENTORY_SAVE_FAILED: 'E009',
    // Errors for Update and Delete Inventory endpoints
    INVENTORY_NOT_FOUND: 'E010',
    INTERNAL_SERVER_ERROR: 'E011',
  };
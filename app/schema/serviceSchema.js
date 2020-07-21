module.exports = {
  uid: {
    type: 'number',
    required: false,
    defaultValue: 0,
    visibility: false,
    name: 'id',
    editable: true,
    inputType: 'hidden',
    label: 'uid',
  },
  description: {
    type: 'string',
    required: true,
    defaultValue: null,
  },
  count: {
    type: 'number',
    required: false,
    defaultValue: 1,
  },
  price: {
    type: 'number',
    required: false,
    defaultValue: 1,
  },
  invoiceID: {
    type: 'number',
    required: true,
    defaultValue: null,
  },
};

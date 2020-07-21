module.exports = {
  id: {
    type: 'number',
    required: false,
    defaultValue: 0,
    visibility: false,
    name: 'id',
    editable: true,
    inputType: 'hidden',
    label: 'id',
  },
  uid: {
    type: 'number',
    required: false,
    defaultValue: 0,
    visibility: true,
    name: 'id',
    editable: false,
    label: 'id',
  },
  name: {
    type: 'string',
    required: true,
    defaultValue: '',
    visibility: true,
    name: 'name',
    editable: true,
    inputType: 'text',
    label: 'Имя',
    validationRules: {
      type: 'string',
    },
  },
  address: {
    type: 'string',
    required: true,
    defaultValue: null,
    visibility: true,
    name: 'address',
    editable: true,
    inputType: 'text',
    label: 'Адрес',
    validationRules: {
      type: 'string',
    },
  },
};
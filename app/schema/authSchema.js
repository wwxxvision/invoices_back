module.exports = {
  login: {
    type: 'string',
    required: true,
    defaultValue: null,
    inputType: 'email',
    visibility: true,
    name: 'login',
    label: 'email',
    editable: true,
    placeholder: 'example@mail.com',
    validationRules: {
      type: 'string',
    },
  },
  password: {
    type: 'string',
    required: true,
    defaultValue: null,
    inputType: 'password',
    visibility: true,
    name: 'password',
    label: 'password',
    editable: true,
    placeholder: '********',
    validationRules: {
      type: 'string',
    },
  },
};

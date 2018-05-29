const [
  TYPE_INPUT,
  TYPE_TEXTAREA,
  TYPE_CHECKBOXGROUP,
  TYPE_RADIOGROUP,
  TYPE_DROPDOWN,
  OTHER
] = [
  'TYPE_INPUT',
  'TYPE_TEXTAREA',
  'TYPE_CHECKBOXGROUP',
  'TYPE_RADIOGROUP',
  'TYPE_DROPDOWN',
  'OTHER'
];

export default [
  {
    formType: 'TYPE_INPUT',
    autofocus: true,
    propName: 'email',
    label: 'Email',
    placeholder: 'Enter User Email',
    // validation: yup.string()
    //   .min(5, "C'mon, your email is longer than that")
    //   .required('Email is required')
    //   .email('Invalid Email')
  },

  {
    formType: 'TYPE_INPUT',
    propName: 'username',
    label: 'User Name',
    placeholder: 'Enter a User Name',
    // validation: yup.string()
    //   .min(5, "C'mon, your username is longer than that")
    //   .required('Username is required')
  },

  {
    formType: 'TYPE_INPUT',
    propName: 'website',
    label: 'Website',
    placeholder: 'Enter a Website',
    disabled: true,
    // validation: yup.string()
    //   .url()
    //   .required('Website is required')
  },

  {
    formType: 'TYPE_INPUT',
    propName: 'amount',
    currency: true,
    inputType: 'number',
    label: 'Amount',
    placeholder: 'Enter an Amount',
    // validation: yup.string()
    //   .required('You can spare some')
  },

  {
    formType: 'TYPE_TEXTAREA',
    propName: 'description',
    label: 'Description',
    placeholder: 'Enter a Description',
    description: 'Enter a Description',
    disabled: true,
    // validation: yup.string()
    //   .required('Description is required')
  },

  {
    formType: 'TYPE_RADIOGROUP',
    propName: 'user_permission',
    label: 'Permission',
    options: [
      { key: 'SEND-AND-RECEIVE', text: 'Send and Recieve' },
      { key: 'RECEIVE', text: 'Recieve' },
    ],
    // validation: yup.string()
    //   .required('User Permission is required')
  },

  {
    formType: 'TYPE_CHECKBOXGROUP',
    propName: 'card_preferences',
    label: 'Card Preferences',
    options: [
      { key: 'VIRTUAL', text: 'Virtual' },
      { key: 'PHYSICAL', text: 'Physical' }
    ],
    // validation: yup.array()
    //   .required('User Permission is required')
  },

  {
    formType: 'TYPE_DROPDOWN',
    label: 'API Version: ',
    placeholder: 'V3.1 // KYC 3.0 // Language',
    propName: 'api_version',
    options: [
      { key: 'V3.1', text: 'v3.1' },
      { key: 'V3', text: 'v3' }
    ],
    // validation: yup.string()
    //   .required('User Permission is required')
  },

  // {
  //   formType: 'OTHER',
  //   propName: 'other_preference',
  //   label: 'Other Preferences',
  //   // validation: yup.string()
  //   //   .required('Other Preferences are required')
  // },
  // {
  //   formType: 'OTHER',
  //   label: 'From Nodes',
  //   placeholder: 'Node',
  //   propName: 'from_node',
  //   options: [
  //     { key: 'DEPOSIT-US', text: 'Deposit' },
  //     { key: 'SUBNET', text: 'Subnet' },
  //     { key: 'CARD-US', text: 'Card' },
  //   ],
  //   // validation: yup.string()
  //   //   .required('From Node is required 1')
  //   //   .when('card_preferences', (card_preferences, schema) => {
  //   //     return card_preferences && _.isEmpty(card_preferences) ?
  //   //       schema.required('Card Preferences have to be selected')
  //   //       : schema.required('From Node is required 2');
  //   //   })
  // },
  // {
  //   formType: 'OTHER',
  //   propName: 'compliance_notes',
  //   label: 'Description',
  //   placeholder: 'Enter a Description',
  //   description: 'Enter a Description',
  //   // validation: yup.string()
  //   //   .required('Other Preferences are required')
  // }
  
]
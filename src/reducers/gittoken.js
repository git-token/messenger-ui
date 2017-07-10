const GITTOKEN_CMD_DATA = {
  ['/help']: [{
    command: '/login',
    description: 'Authenticate with contract and local keystore',
    example: '/login [your@email.com]'
  },{
    command: '/prices',
    description: 'Get daily price history for token.\nPass in date range and token symbol pairs.',
    example: '/prices [1/1/2017, 6/1/2017, GTK, ETH]'
  },{
    command: '/returns',
    description: 'Get daily returns for token.\nPass in date range and token symbol pairs.',
    example: '/returns [1/1/2017, 6/1/2017, GTK, ETH]'
  },{
    command: '/chart',
    description: 'Get daily price chart for token.\nPass in date range and token symbol pairs.',
    example: '/chart [1/1/2017, 6/1/2017, GTK, ETH]'
  },{
    command: '/contributions',
    description: 'Get contributions history',
    example: '/contributions'
  },{
    command: '/orders',
    description: 'Get current order book for token pairs.\nPass in symbol pairs.',
    example: '/orders [GTK, ETH]'
  },{
    command: '/vote',
    description: 'Vote or raise new vote for contract changes.\n0x0 == Measure ID; 0 == NO; 1 == YES.',
    example: '/vote [0x0, 0]'
  },{
    command: '/ask',
    description: 'Create ask offer for token at quantity and price.\nPass in quantity, price, and token pairs.',
    example: '/ask [11.96, 7.3, GTK, ETH]'
  },{
    command: '/bid',
    description: 'Create bid offer for token at quantity and price.\nPass in quantity, price, and token pairs.',
    example: '/bid [11.96, 7.3, GTK, ETH]'
  },{
    command: '/help',
    description: 'Return this message',
    example: '/help'
  }],
  ['/login']: [],
  ['/keystore']: []
}


const INITIAL_GITTOKEN_STATE = {
  email: 'ryan.michael.tate@gmail.com',
  verifyCode: '',
  contributorAddress: '',
  contractAddress: '',
  isContributor: false,
  verified: false,
  contributions: {},
  contributors: {},
  totalSupply: 0,
  organizaiton: '',
  symbol: '___',
  socketConnected: false,
  messenger: {
    input: '',
    inputType: 'text',
    placeholder: 'Type `/help` for options',
    data: {},
    activeTopic: 'account',
    topics: [ 'account', 'contributions', 'vote', 'exchange' ],
    cmdData: GITTOKEN_CMD_DATA,
    messages: [{
      contributor: 'GitToken Helper',
      date: new Date().getTime(),
      msg: 'Hello!',
      topic: 'login',
      cmd: null,
      data: null,
      public: false
    // },{
    //   contributor: 'GitToken Helper',
    //   date: new Date().getTime(),
    //   msg: `Please type '/keystore'`,
    //   topic: 'login',
    //   cmd: '/keystore',
    //   data: GITTOKEN_CMD_DATA['/keystore'],
    //   public: false
    // },{
    //   contributor: 'GitToken Helper',
    //   date: new Date().getTime(),
    //   msg: `type '/help' for a list of commands`,
    //   topic: 'login',
    //   cmd: '/help',
    //   data: GITTOKEN_CMD_DATA['/help'],
    //   public: false
    }]
  }
}


export default function gittoken(state=INITIAL_GITTOKEN_STATE, action) {
  switch(action.type) {
    case 'SET_GITTOKEN_DETAILS':
      return {
        ...state,
        [action.id]: action.value
      }
    case 'ADD_CONTRIBUTION_EVENT':
      return {
        ...state,
        contributions: {
          ...state['contributions'],
          [action.id]: action.value
        }
      }
    case 'ADD_CONTRIBUTOR_REWARD':
      return {
        ...state,
        contributions: {
          ...state['contributions'],
          [action.id]: action.value
        }
      }
    case 'APPEND_MESSAGE':
      return {
        ...state,
        messenger: {
          ...state['messenger'],
          messages: [
            ...state['messenger']['messages'],
            action.value
          ]
        }
      }
    case 'UPDATE_MESSENGER':
      return {
        ...state,
        messenger: {
          ...state['messenger'],
          [action.id]: action.value
        }
      }
    case 'SOCKET_CONNECTION':
      return {
        ...state,
        socketConnected: action.value
      }
    default:
      return state
  }
}

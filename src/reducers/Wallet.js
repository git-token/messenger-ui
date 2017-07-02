const INITIAL_WALLET_STATE = {
  keystore: null,
  showModal: false,
  activeView: 'SignData',
}

export default function Wallet (state=INITIAL_WALLET_STATE, action) {
  switch(action.type) {
    case 'SET_WALLET_VIEW':
      return {
        ...state,
        activeView: action.value
      }
    case 'TOGGLE_WALLET_MODAL':
      return {
        ...state,
        showModal: action.value
      }
    case 'SET_KEYSTORE':
      return {
        ...state,
        keystore: action.value
      }
    default:
      return state
  }
}

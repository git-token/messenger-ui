import Promise, { promisifyAll, join } from 'bluebird'
import GitToken from 'gittoken-api-middleware/build/contracts/GitToken.json'
import { store } from '../store'
import web3 from '../web3Provider'
import config from '../../app.config'
import { w3cwebsocket } from 'websocket'
import { keystore, signing } from 'eth-lightwallet/dist/lightwallet.min.js'

const { contractAddress } = config
const { abi, unlinked_binary } = JSON.parse(GitToken)
const eth = promisifyAll(web3.eth)
const lsKey = new Buffer('GitTokenKeystore').toString('hex')

let GitTokenContract = web3.eth.contract(abi).at(contractAddress)
let SocketClient

export function blockchainDetails() {
  return (dispatch) => {
    join(
      eth.getBlockNumberAsync()
    ).then((data) => {
      console.log('data', data)
    }).catch((error) => {
      console.error(error)
    })
  }
}

export function openSocketConnection() {
  return (dispatch) => {
    SocketClient = new w3cwebsocket('ws://localhost:1751', 'echo-protocol')
    SocketClient.onopen = () => {
      console.log('Socket Connection Opened')
      dispatch({ type: 'SOCKET_CONNECTION', value: true })
    }

    SocketClient.onerror = () => {
      dispatch({ type: 'SOCKET_CONNECTION', value: false })
    }
  }
}

export function sendMessage({ input, activeTopic, contributorAddress, data }) {
  return (dispatch) => {

    if (input.match(RegExp('/keystore new'))) {
      dispatch({ type: 'UPDATE_MESSENGER', id: 'inputType', value: 'password' })
      dispatch({ type: 'UPDATE_MESSENGER', id: 'placeholder', value: 'Enter New Password' })
      dispatch({ type: 'UPDATE_MESSENGER', id: 'data', value: { event: 'newKeystore' } })
      dispatch({ type: 'UPDATE_MESSENGER', id: 'input', value: '' })
      dispatch({ type: 'APPEND_MESSAGE', value: {
        msg: `
          Create new keystore.
          Please enter a new password
        `,
        date: new Date().getTime(),
        topic: 'login',
        contributor: 'GitToken Helper'
      } })
    } else if (input.match(RegExp('/login'))) {
      let email = input.replace('/login ', '')
      dispatch(verifyEmail({ contributorAddress, email }))
    } else if (data['event'] == 'newKeystore') {
      dispatch(createKeystore({ password: input }))
    } else {
      SocketClient.send(JSON.stringify({
        event: data['event'] || activeTopic,
        message: input,
        data
      }))

      SocketClient.onmessage = (e) => {
        console.log('e', e)
      }
    }
  }
}

export function contractDetails() {
  return (dispatch) => {
    join(
      GitTokenContract.totalSupply.call(),
      // GitTokenContract.organization.call(),
      // GitTokenContract.symbol.call()
    ).then((data) => {
      console.log('data', data)
      // dispatch({ type: 'SET_CONTRACT_DETAILS', id:  })
      return null
    }).catch((error) => {
      console.log('contractDetails::error', error)
    })
  }
}


export function watchContributions(contributor) {
  return (dispatch) => {
    let Contributions = GitTokenContract.Contribution({ contributor }, {
      fromBlock: 0,
      toBlock: 'latest'
    },(error, result) => {
      const { transactionHash } = result
      console.log('watchContributions::error', error);
      dispatch({
        type: 'ADD_CONTRIBUTION_EVENT',
        id: transactionHash,
        value: result
      })
    })

  }
}

export function authenticateEmail(_email) {
  return (dispatch) => {
    join(
      GitTokenContract.getContributorAddress.call(_email),
      GitTokenContract.getUnclaimedRewards.call(_email)
    ).then((data) => {
      if (data[0] != '0x0000000000000000000000000000000000000000') {
        dispatch({ type: 'SET_GITTOKEN_DETAILS', id: 'contributorAddress', value: data[0] })
        dispatch({ type: 'SET_GITTOKEN_DETAILS', id: 'isContributor', value: true })
        dispatch({ type: 'SET_GITTOKEN_DETAILS', id: 'verified', value: true })
      } else if (data[1].toNumber() > 0) {
        dispatch({ type: 'SET_GITTOKEN_DETAILS', id: 'isContributor', value: true })
        dispatch({ type: 'SET_GITTOKEN_DETAILS', id: 'verified', value: false })
      } else {
        dispatch({ type: 'SET_GITTOKEN_DETAILS', id: 'isContributor', value: false })
      }

    }).catch((error) => {
      console.log('authenticateEmail::error', error)
    })

  }
}

export function createKeystore({ password }) {
  return (dispatch) => {
    keystore.createVault({
      password
    }, (error, ks) => {
      if (error) { console.log('createKeystore::createVault::error', error) }

      ks.keyFromPassword(password, (error, pwDerivedKey) => {
        if (error) { console.log('createKeystore::keyFromPassword::error', error) }
        ks.generateNewAddress(pwDerivedKey, 1)
        let serialized = ks.serialize()
        localStorage.setItem(lsKey, serialized)
        dispatch({ type: 'UPDATE_MESSENGER', id: 'input', value: '' })
        dispatch({ type: 'UPDATE_MESSENGER', id: 'data', value: { } })
        dispatch({ type: 'UPDATE_MESSENGER', id: 'inputType', value: 'text' })
        dispatch(retrieveKeystore({ }))
      })
      // let serialized
      // localStorage.setItem
    })
  }
}



export function retrieveKeystore({ }) {
  return (dispatch) => {
    const serialized = localStorage.getItem(lsKey)
    let newMessage;

    if (!serialized) {
      dispatch({ type: 'APPEND_MESSAGE', value: {
        msg: 'Could not find keystore; Please type `/keystore new`',
        date: new Date().getTime(),
        topic: 'login',
        contributor: 'GitToken Helper'
      } })
    } else {
      let ks = keystore.deserialize(serialized)
      let address = ks.getAddresses()[0]
      dispatch({ type: 'SET_GITTOKEN_DETAILS', id: 'contributorAddress', value: `0x${address}` })
      Promise.resolve().then(() => {
        dispatch(retrieveAccountDetails({ contributorAddress: `0x${address}` }))
        return Promise.delay(1000);
      }).then(() => {
        dispatch({
          type: 'APPEND_MESSAGE',
          value: {
            msg: 'Type `/login [your@email.com]` to login',
            date: new Date().getTime(),
            topic: 'login',
            contributor: 'GitToken Helper',
            data: {}
          }
        })

        dispatch({
          type: 'UPDATE_MESSENGER',
          id: 'input',
          value: `/login `
        })
      }).catch((error) => {
        console.log('retrieveKeystore::error', error)
      })
    }
  }
}

export function retrieveAccountDetails({ contributorAddress }) {
  return (dispatch) => {
      join(
        eth.getBalanceAsync(contributorAddress),
        GitTokenContract.balanceOf.call(contributorAddress)
      ).then((data) => {
        dispatch({
          type: 'APPEND_MESSAGE',
          value: {
            msg: `Account Information`,
            date: new Date().getTime(),
            topic: 'login',
            contributor: 'GitToken Helper',
            data: {
              event: 'accountDetails',
              table: [{
                type: 'address',
                value: contributorAddress
              },{
                type: 'balance (ETH)',
                value: data[0].toNumber()/1e18
              },{
                type: 'tokens',
                value: data[1].toNumber()
              }]
            }
          }
        })
        console.log('data', data)
      }).catch((error) => {
        console.log('error', error)
      })
  }
}

export function verifyEmail({ contributorAddress, email }) {
  return (dispatch) => {
    console.log('verifyEmail::contributorAddress, email', contributorAddress, email)
    join(
      GitTokenContract.getContributorAddress.call(email)
    ).then((data) => {

      if (data[0] == '0x0000000000000000000000000000000000000000') {
        console.log('Not registered')
      } else if (data[0] != contributorAddress) {
        console.log('Registered for another account; Re-verify email')
        dispatch({
          type: 'APPEND_MESSAGE',
          value: {
            msg: `
              Account registered to ${data[0]}.
              Please verify email for address ${contributorAddress}.
              Type '/verify [your@email.com]'`,
            date: new Date().getTime(),
            topic: 'login',
            contributor: 'GitToken Helper',
            data: {
              event: 'verify'
            }
          }
        })

        dispatch({
          type: 'UPDATE_MESSENGER',
          id: 'input',
          value: `/verify ${email}`
        })
      } else {
        console.log('Welcome Back!!')
      }

    }).catch((error) => {
      console.log('error', error)
    })

  }
}

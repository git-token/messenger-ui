import Web3 from 'web3'
import { web3Provider } from '../app.config'

const web3 = new Web3(new Web3.providers.HttpProvider(web3Provider))

export default web3

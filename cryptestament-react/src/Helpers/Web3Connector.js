import Web3 from 'web3'
import Torus from '@toruslabs/torus-embed'

const Web3Connector = {
  web3: new Web3(),
  setweb3: function(provider) {
    const web3Inst = new Web3(provider)
    Web3Connector.web3 = web3Inst
    sessionStorage.setItem('pageUsingTorus', true)
  },
  initialize: async function() {
    const torus = new Torus()
    await torus.init()
    await torus.login()
    Web3Connector.setweb3(torus.provider)
    return torus;
  }
}
export default Web3Connector
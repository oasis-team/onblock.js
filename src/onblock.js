import uuidv4 from 'uuid/v4'
import Message from './message'
import config from './config'

const nodeDict = config.nodes.reduce((prev, next) => (prev[next.name] = next, prev), {})

const actionMap = {}

const onMessage = ({ source, data: message }) => {
  if(window.parent !== source) return;
  if(message && message.actionId != undefined && actionMap[message.actionId]) {
    const EE = actionMap[message.actionId]
    if (message.pending) {
      EE.emit('pending', message.pending)
    }else {
      if(message.success){
        EE.emit('success', message.success)
      }else if(message.failed){
        EE.emit('failed', message.failed)
      }
      delete actionMap[message.actionId]
    }
  }
}


class OnBlock {
  constructor(url){
    this.pack = null
    this.iost = null
    this.rpc = null
    this.account = null
    this.network = null
    
    window.addEventListener('message', onMessage)
  }

  newIOST(IOST){
    if(!IOST){
      throw 'need IOST'
    }
    if(!this.account){
      throw 'need enable'
    }
    IOST.IOST.prototype.signAndSend = signAndSend.bind(this)

    this.pack = IOST
    this.iost = new IOST.IOST(config.defaultConfig)
    this.rpc = new IOST.RPC(new IOST.HTTPProvider(nodeDict[this.network || 'MAINNET'].url))

    this.iost.setRPC(this.rpc)
    this.iost.setAccount(this.iost.account)
    this.iost.account = new IOST.Account(this.account.name)
    this.iost.rpc = this.rpc

    return this.iost
  }

  isInOnBlock(_onblockUrl){
    let _hostname = ''
    if(_onblockUrl){
      try {
          _hostname = new URL(_onblockUrl).hostname
      } catch (err) {
        console.log(err)
      }
    }
    this.onblockUrl = _onblockUrl || config.onblockUrl
    const onblockUrls = [...config.onblockUrls, _hostname]
    const url = (window.location != window.parent.location)
    ? document.referrer
    : document.location.href;
    return onblockUrls.indexOf((new URL(url)).hostname) > -1
  }

  enable(){
    return new Promise((resolve, reject) => {
      if(this.account){
        resolve(this.account.name)
      }else {
        const actionId = uuidv4()
        const EE = new Message()
        actionMap[actionId] = EE
        EE.once('success', (data) => {
          this.account = data.account
          this.network = data.account.network
          resolve(this.account.name)
        }).once('failed', reject)
        top.postMessage({action: 'GET_ACCOUNT', actionId, data: null }, this.onblockUrl)
      }
    })
  }

  getOnBlockAccountInfo(){
    return new Promise((resolve, reject) => {
      if(!this.account) return reject('no account') 
      const actionId = uuidv4()
      const EE = new Message()
      actionMap[actionId] = EE
      EE.on('success', data => resolve({ balances: data }))
      .on('failed', reject)
      top.postMessage({
        action: 'GET_OnBlock_ACCOUNT_INFO', 
        actionId, 
        data: { account: this.account } 
      }, this.onblockUrl)
    })
  }
}

function signAndSend(tx){
  const domain = document.domain
  const actionId = uuidv4()
  const EE = new Message()
  actionMap[actionId] = EE
  if(this.account){
    top.postMessage({ action: 'TX_ASK', actionId, data: { domain,  tx } }, this.onblockUrl)
  }else{
    EE.delay(0).emit('failed', {type: 'err', message: 'no account'})
  } 
  return EE
}

export default OnBlock
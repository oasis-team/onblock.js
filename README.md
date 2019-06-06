#onblock.js

JS SDK of OnBlock

## Installation
Using npm in your project
```bash
npm install onblock
```

## CDN
```javascript
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/onblock@0.1.6/dist/onblock.min.js"></script>
```
exports to window.OnBlock global.

## Usage

### IOST
```javascript
import OnBlock from 'onblock'
import IOST form 'iost'


const isInOnBlock = OnBlock.isInOnBlock()
if(isInOnBlock){
  OnBlock.enable().then((name) => {
    if(!name) return;

    const user = OnBlock.account
    const iost = OnBlock.newIOST(IOST)

  })
}

// get user wallet
OnBlock.getOnBlockAccountInfo()
.then(data => {
  console.log(data.balances)
})


//tx
const tx = iost.callABI('contractName', 'actionName', 'memo');
tx.setGas(1,200000)
tx.addApprove('iost', '10')

iost.signAndSend(tx)
.on('pending', (hash) => {})
.on('success', (data) => {})
.on('failed', (err) => {})

```

### EOS
```javascript
import OnBlock from 'onblock'
import Eos from 'eosjs'


const isInOnBlock = OnBlock.isInOnBlock()
if(isInOnBlock){
  OnBlock.enable().then((name) => {
    if(!name) return;

    const network = {
      blockchain: 'eos',
      host: 'proxy.eosnode.tools',
      port: 443,
      protocol: 'https',
      chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
    }
    const eos = OnBlock.newEOS(Eos, network)
    // const eos = OnBlock.newEOS(Eos)

  })
}

// get user wallet
OnBlock.getOnBlockAccountInfo()
.then(data => {
  console.log(data.balances)
})


//tx
eos.transfer(account.name, 'onblockblock', '0.0001 EOS', account.name).then(res => {
    console.log('sent: ', res);
}).catch(err => {
    console.error('error: ', err);
});
```




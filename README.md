#onblock.js

JS SDK of OnBlock

## Installation
Using npm in your project
```
npm install onblock
```

## CDN
```
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/onblock@0.1.0/dist/onblock.min.js"></script>
```
exports to window.OnBlock global.

## Usage
```
import OnBlock from 'onblock'
import IOST form 'iost'


const isInOnBlock = OnBlock.isInOnBlock()
if(isInOnBlock){
  OnBlock.enable().then((name) => {
    if(!name) return;

    const iost = OnBlock.newIOST(IOST)
    const user = OnBlock.account

  })
}

// get user wallet
iost.getOnBlockAccountInfo()
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




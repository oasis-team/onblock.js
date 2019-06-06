

const config = {
  defaultConfig: {
    gasRatio: 1,
    gasLimit: 100000,
    delay: 0,
    expiration: 90,
    defaultLimit: "unlimited"
  },
  nodes: [
    {
      name: 'MAINNET',
      url: 'https://api.iost.io',
      chain_id: 1024,
      default: true
    },
    {
      name: 'TESTNET',
      url: 'https://test.api.iost.io',
      chain_id: 1023,
      default: true
    }
  ],
  onblockUrl: 'https://onblock.me',
  onblockUrls: [
    'onblock.me',
    'onblock.com',
  ],
  eosNetwork:{
    blockchain: 'eos',
    host: 'proxy.eosnode.tools',
    port: 443,
    protocol: 'https',
    chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
  },
}

export default config
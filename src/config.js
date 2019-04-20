

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
}

export default config
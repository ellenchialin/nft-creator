export const formatDisplayAccount = address => {
  const firstPart = address.slice(0, 6);
  const SecondPart = address.slice(-4);
  return `${firstPart}...${SecondPart}`;
};

export const networks = [
  {
    name: 'eth',
    params: {
      chainId: `0x${Number(1).toString(16)}`,
      chainName: 'Ethereum Mainnet',
      nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
      },
      rpcUrls: ['https://api.mycryptoapi.com/eth'],
      blockExplorerUrls: ['https://etherscan.io'],
    },
    displayName: 'Ethereum',
    imageUrl: '/assets/ethereum.png',
  },
  {
    name: 'polygon',
    params: {
      chainId: `0x${Number(137).toString(16)}`,
      chainName: 'Polygon Mainnet',
      nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18,
      },
      rpcUrls: ['https://polygon-rpc.com/'],
      blockExplorerUrls: ['https://polygonscan.com/'],
    },
    displayName: 'Polygon',
    imageUrl: '/assets/polygon-matic.png',
  },
  {
    name: 'bsc',
    params: {
      chainId: `0x${Number(56).toString(16)}`,
      chainName: 'Binance Smart Chain Mainnet',
      nativeCurrency: {
        name: 'Binance Chain Native Token',
        symbol: 'BNB',
        decimals: 18,
      },
      rpcUrls: [
        'https://bsc-dataseed1.binance.org',
        'https://bsc-dataseed2.binance.org',
        'https://bsc-dataseed3.binance.org',
        'https://bsc-dataseed4.binance.org',
        'https://bsc-dataseed1.defibit.io',
        'https://bsc-dataseed2.defibit.io',
        'https://bsc-dataseed3.defibit.io',
        'https://bsc-dataseed4.defibit.io',
        'https://bsc-dataseed1.ninicoin.io',
        'https://bsc-dataseed2.ninicoin.io',
        'https://bsc-dataseed3.ninicoin.io',
        'https://bsc-dataseed4.ninicoin.io',
        'wss://bsc-ws-node.nariox.org',
      ],
      blockExplorerUrls: ['https://bscscan.com'],
    },
    displayName: 'BSC',
    imageUrl: '/assets/binance-coin-bnb.png',
  },
  {
    name: 'rinkeby',
    params: {
      chainId: `0x${Number(4).toString(16)}`,
      chainName: 'Rinkeby',
      nativeCurrency: {
        name: 'Rinkeby Ether',
        symbol: 'RIN',
        decimals: 18,
      },
      rpcUrls: ['https://rinkeby.infura.io/v3/'],
      blockExplorerUrls: ['https://rinkeby.etherscan.io'],
    },
    displayName: 'Rinkeby',
    imageUrl: '/assets/ethereum.png',
  },
];

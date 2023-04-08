import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-solc";
import "@matterlabs/hardhat-zksync-verify";
 
module.exports = {
  zksolc: {
    version: "1.3.5",
    compilerSource: "binary",  // binary or docker (deprecated)
    settings: {}
  },
  defaultNetwork: "zkSyncTestnet",
 
  networks: {
    goerli: {
      url: "https://goerli.infura.io/v3/477cb4aa68d14006931b31c5beeade80" // URL of the Ethereum Web3 RPC (optional)
    },
    zkSyncTestnet: {
      url: "https://testnet.era.zksync.dev",
      ethNetwork: "goerli", // Can also be the RPC URL of the network (e.g. `https://goerli.infura.io/v3/`)
      zksync: true,
      // Verification endpoint for Goerli
      verifyURL: "https://zksync2-testnet-explorer.zksync.dev/contract_verification",
    },
  },
  solidity: {
    version: "0.8.17",
  },
};

<template>
  <div id="app" v-if="!mainLoading">
    <h1>zkSync NFT</h1>
    <div class="main-box">
      <input
        class="mint-input"
        v-model="recipientAddress"
        placeholder="Enter Recipient Address"
      />
      <button
        class="mint-button"
        v-on:click="mint"
      >
        <span>Mint</span>
      </button>
      <div v-if="minted">
        <h2>Minted!</h2>
        <a v-bind:href="mintSquareUrl" target="_blank">View on Mint Square</a>
      </div>
    </div>
  </div>
  <div id="app" v-else>
    <div class="start-screen">
      <h1>Welcome to zkSync NFT!</h1>
      <button v-on:click="connectMetamask" class="connect-button">Connect Metamask</button>
    </div>
  </div>
</template>

<script>

import { Contract, Web3Provider, Provider } from "zksync-web3";

const PROVIDER_URL = "https://testnet.era.zksync.dev";
const NFT_CONTRACT_ADDRESS = "0x2a31f1a4c84505b2a434602a22829aade427b6c5";
const NFT_CONTRACT_ABI = require("./abi.json");
const NFT_MARKET_URL = "https://mintsquare.io/collection/zksync-testnet/";

export default {
  name: "App",
  data() {
    return {
      mainLoading: true,
      minted: false,
      nftContractAddress: NFT_CONTRACT_ADDRESS,
      mintSquareUrl: NFT_MARKET_URL + NFT_CONTRACT_ADDRESS,
    };
  },
  methods: {
    initializeProviderAndSigner() {
      this.provider = new Provider(PROVIDER_URL);
      this.signer = (new Web3Provider(window.ethereum)).getSigner();
      this.contract = new Contract(
          NFT_CONTRACT_ADDRESS,
          NFT_CONTRACT_ABI,
          this.signer
      );
    },
    async mint() {
      try {
        const txHandle = await this.contract.mintNft(this.recipientAddress);
        await txHandle.wait();
        this.minted = true;
      } catch (e) {
        alert(e)
      }
    },
    loadMainScreen() {
      this.initializeProviderAndSigner();
      this.mainLoading = false;
    },
    connectMetamask() {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(() => {
          if (+window.ethereum.networkVersion == 280) {
            this.loadMainScreen();
          } else {
            alert("Please switch network to zkSync Era Testnet!");
          }
        })
        .catch((e) => console.log(e));
    },
  },
};
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
.main-box {
  text-align: center;
  width: 400px;
  margin: auto;
  margin-top: 40px;
}
.connect-button {
  font-size: 20px;
}
.mint-input {
  font-size: 20px;
  width: 300px;
}
.mint-button {
  margin-left: 5px;
  font-size: 20px;
}
</style>

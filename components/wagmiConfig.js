// config.js
import { createConfig } from "wagmi";
import {  sepolia, mainnet } from "wagmi/chains";
import { injected /* walletConnect*/ } from "wagmi/connectors";
import { http } from "wagmi"; // Adjust import to match correct path


const dAppMetadata = {
  name: "My DApp", // Replace with your dApp name
  url: "http://localhost:3000/", // Replace with your dApp URL
};

const config = createConfig({
  chains: [ sepolia, mainnet],
  connectors: [
    injected(),
  
  ],
  syncConnectedChain: true,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

export default config;
1. Home Page:
   1. Show recently listed NFTs
      1. If you own the NFT, you can update the listing 
      2. If not, you can buy the listing
 2. Sell page:
    1. You can list the NFT on Marketplace     
    2. You can withdraw proceeds when someone buys your listed nft


# NextJS NFT Marketplace with TheGraph

---

## Features

1. **Home Page:**
   - Show recently listed NFTs.
   - If you own the NFT, you can update the listing.
   - If not, you can buy the listing.

2. **Sell Page:**
   - You can list the NFT on the Marketplace.
   - You can withdraw proceeds when someone buys your listed NFT.

---

## Steps to Get Started

### 1. Git clone the contracts repo

In its own terminal/command line, run:

```bash
git clone https://github.com/PatrickAlphaC/hardhat-nft-marketplace-fcc
cd hardhat-nextjs-nft-marketplace-fcc
yarn
2. Deploy to Sepolia
After installing dependencies, deploy your contracts to Sepolia:

bash
Copy code
yarn hardhat deploy --network sepolia
3. Deploy your subgraph
Run the following commands to clone and deploy the subgraph:

bash
Copy code
cd ..
git clone https://github.com/PatrickAlphaC/graph-nft-marketplace-fcc
cd graph-nft-marketplace-fcc
yarn
Follow the instructions in the README of that repo.

Then, make a .env file and place your temporary query URL into it as NEXT_PUBLIC_SUBGRAPH_URL.

4. Start your UI
Make sure that:

In your networkMapping.json, you have an entry for NftMarketplace on the Sepolia network.
You have a NEXT_PUBLIC_SUBGRAPH_URL in your .env file.
Finally, run:

bash
Copy code
yarn dev

























































This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

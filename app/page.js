"use client";
import { useMoralis } from "react-moralis";
import NFTBox from "../components/NFTBox";
import networkMapping from "../constants/networkMapping.json";
import GET_ACTIVE_ITEMS from "../constants/subgraphQueries";
import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";




export default function Home() {
  const { chainId, isWeb3Enabled } = useMoralis();
  const [marketplaceAddress, setMarketplaceAddress] = useState(null);

  // const chainString = chainId ? parseInt(chainId).toString() : null;

  useEffect(() => {
    if (chainId) {
      const chainString = parseInt(chainId).toString();
      const address = networkMapping[chainString]?.NftMarketplace?.[0];
      setMarketplaceAddress(address);
    }
  }, [chainId]);

  // Call `useQuery` unconditionally
  const { loading, error, data: listedNfts } = useQuery(GET_ACTIVE_ITEMS, {
    skip: !isWeb3Enabled || !marketplaceAddress, // Skip the query if conditions are not met
  });

  // Early return if web3 is not enabled or marketplace address is not set
  if (!isWeb3Enabled || !marketplaceAddress) {
    return <div>Loading...</div>; // Show a loading message or spinner
  }

  console.log("marketplace address", marketplaceAddress);

  return (
         <div className="container mx-auto ">
          <h1 className="py-4 px-4 italic text-4xl font-semibold text-teal-700 ">Recently Listed</h1>
          <div className="flex flex-wrap">
            {isWeb3Enabled && chainId ? (
              loading || !listedNfts ? (
                <div>Loading...</div>
              ) : (
                listedNfts.activeItems.map((nft) => {
                  const { price, nftAddress, tokenId, seller } = nft;
                  return marketplaceAddress ? (
                    <NFTBox
                      price={price}
                      nftAddress={nftAddress}
                      tokenId={tokenId}
                      nftMarketPlaceAddress={marketplaceAddress}
                      seller={seller}
                      key={`${nftAddress}${tokenId}`}
                    />
                  ) : (
                    <div>Network error, please switch to a supported network.</div>
                  );
                })
              )
            ) : (
              <div>Web3 Currently Not Enabled</div>
            )}
          </div>
        </div>

  );
}


// 1. updateModal ***DONE***
// 2. NFTbox  ***DONE***
// 3. page.js ***DONE***
// 4. sell-nft ***DONE***



// 1. updateModal ***DONE***
// 2. NFTbox  ***DONE***
// 3. page.js ***DONE***
// 4. sell-nft ***DONE***

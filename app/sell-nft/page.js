"use client"
import Head from "next/head";
import{useNotification, Button, Form} from "web3uikit"
import{useMoralis, useWeb3Contract} from "react-moralis"
import{useState, useEffect} from "react"
import{ethers} from"ethers"
import abi from "../../constants/abi.json"
import Abi from "../../constants/ABI.json"
import networkmapping from "../../constants/networkMapping.json"
import { useAccount } from "wagmi";
import { readContract, writeContract  } from "@wagmi/core";
import config from "../../components/wagmiConfig"


export default function Home() {
const{isWeb3Enabled, enableWeb3  , chainId} = useMoralis()
const dispatch = useNotification()
const accounts = useAccount()
const {runContractFunction} = useWeb3Contract()
const [proceeds, setProceeds] = useState()
const chainString = chainId ? parseInt(chainId).toString() : "11155111"
const effectiveChainId = chainString === "31337" ? "11155111" : chainString;

// Abis Formatting & Address
const nftAbi = abi[effectiveChainId]["BasicNft"]
const marketPlaceAbi = Abi[effectiveChainId]["NftMarketPlace"]
const marketPlaceAddress = networkmapping[effectiveChainId].NftMarketplace[0]


console.log(" chain String : ",effectiveChainId)
console.log("nft abi : ",nftAbi)
console.log("nft marketplace abi : ",marketPlaceAbi)
console.log("nft marketplace address : ",marketPlaceAddress)
console.log("accounts : ",accounts)
const sellerAddress = accounts?.address; // Directly access the address
console.log("Seller Address:", sellerAddress);


// Functions
async function approveAndList(data) {
  console.log("Approving...")
  console.log("Submitted Data:", data);

  const nftAddress = data.data[0].inputResult
  const tokenId = data.data[1].inputResult
  const priceInput = data.data[2]?.inputResult;
  const price = ethers.utils.parseUnits(priceInput, "ether").toString();

  if (nftAddress && tokenId && price) {
    console.log("data is fine");
  }


const approveOptions = {
  abi: nftAbi,
  contractAddress: nftAddress,
  functionName: "approve",
  params: {
   to: marketPlaceAddress,
    tokenId,
  },
}


 await runContractFunction({
  params: approveOptions,
  onSuccess: (tx) => handleApproveSuccess(tx, nftAddress, tokenId, price),
  onError: (error) => {
    console.log("Error from approve",error)
  }
 })

 }


async function handleApproveSuccess(tx, nftAddress, tokenId, price) {
  console.log("OK, Now we are Listing It....")
  await tx.wait()
  const listOptions = {
    abi: marketPlaceAbi,
    contractAddress: marketPlaceAddress,
    functionName: "listItem",
    params: {
      nftAddress,
      tokenId,
      price,
    },
  }

  await runContractFunction({
    params: listOptions,
    onSuccess: () => handleListSuccess(),
    onError: (error) => {
      console.log(error)
    },
  })
}

async function handleListSuccess() {
  dispatch({
    type: "success",
    message: "Nft Listing!",
    title: "NFT Listed",
    position: "topR",
  })
}

async function withdraw(){
  const withdrawOptions = {
    abi: marketPlaceAbi,
    contractAddress: marketPlaceAddress,
    functionName: "withdrawProceeds",
    params: {},
  }
  await runContractFunction({
    params: withdrawOptions,
    onSuccess: () => handleWithdrawSuccess(),
    onError: (error) => {
      console.log(error)
    },
  })
}

async function handleWithdrawSuccess(){
  dispatch({
    type: "success",
    message: "Withdrawing Proceeds",
    position: "topR"
  })
}

async function setupUI(){
  try {
    // Ensure Web3 is enabled
    if (!isWeb3Enabled) {
      console.log("WEB3 WAS UNABLE BUT NOW ITS ENABLED");
      await enableWeb3();
    
    }

    // Get the seller's address after Web3 is enabled
    const sellerAddress = accounts?.address;

    // Proceed with the contract function if Web3 is enabled
   ////////////////////////////
    const returnProceeds = await runContractFunction({
      params: {
        abi: marketPlaceAbi,
        contractAddress: marketPlaceAddress,
        functionName: "getProceeds",
        params: {
          seller: sellerAddress, // Pass the string address here
        },
      },
      onError: (error) => {
        console.log("Error fetching proceeds:", error);
      },
    });
    // const returnProceeds = await readContract(config, {
    //   abi: marketPlaceAbi,
    //   address: marketPlaceAddress,
    //   functionName: "getProceeds",
    //   args: [sellerAddress],
    // });

    if (returnProceeds) {
      setProceeds(returnProceeds.toString());

    } else {
      console.log("returnProceeds NOT FOUND 404" )
    }
  } catch (error) {
    console.log("Error in setupUI:", error);
  }
}

useEffect(()=>{
  setupUI()
},[accounts, chainId, isWeb3Enabled, proceeds])

console.log("these are the proceeds: ", proceeds)

return (
  <div>
    <Form
      onSubmit={approveAndList}
      data={[
        {
          name: "Nft Address",
          type: "text",
          inputWidth: "50%",
          value: "",
          key: "nftAddress",
        },
        {
          name: "Token ID",
          type: "number",
          value: "",
          key: "tokenId",
        },
        {
          name: "Price (in ETH)",
          type: "number",
          value: "",
          key: "price",
        },
      ]}
    />
    <div className="py-4 px-2 italic text-2xl font-normal	 text-teal-700" >
    Withdraw {proceeds} proceeds
      </div>
    {proceeds != "0" ? (
      <Button
        onClick={() => withdraw()}
        text="Withdraw"
        type="button"
      />
    ) : (
      <div className="py-2 px-2">
        No Proceeds detected</div>
    )}
    </div>
);

}


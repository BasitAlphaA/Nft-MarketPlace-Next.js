 "use client"
import {useState, useEffect, useRef } from "react"
import {useMoralis , useWeb3Contract} from "react-moralis"
import nftMarketPlaceAbi from "../constants/ABI.json"
import abi from "../constants/abi.json"
import Image from "next/image"
import { Card, useNotification } from "web3uikit"
import { ethers } from "ethers"
import UpdateListingModal from "./UpdateListingModal"
import config from "./wagmiConfig"
import { readContract } from "@wagmi/core";
import { useAccount } from 'wagmi'



const truncateStr = (fullStr, strLen) => {
    if (fullStr.length <= strLen) return fullStr

    const separator = "..."
    const seperatorLength = separator.length
    const charsToShow = strLen - seperatorLength
    const frontChars = Math.ceil(charsToShow / 2)
    const backChars = Math.floor(charsToShow / 2)
    return (
        fullStr.substring(0, frontChars) +
        separator +
        fullStr.substring(fullStr.length - backChars)
    )
}


export default  function NFTBox({price , nftAddress, tokenId, nftMarketPlaceAddress, seller}) {
    const {isWeb3Enabled, chainId} = useMoralis()
    const accounts = useAccount()
    const [imageUri, setImageUri] = useState("")
    const [tokenName, setTokenName] = useState("")
    const  [tokenDescription, setTokenDescription] = useState("")
    const [showModal, setShowModal] = useState(false)
    const hideModal = ()=> setShowModal(false)
    const dispatch = useNotification()
    // const chainId = useMoralis(); // Get current chain ID
    // const {writeContract } = useWriteContract()
    const chainId2 = chainId ? parseInt(chainId).toString() : "11155111"
    const chainString = chainId2 === "31337" ? "11155111" : chainId2;
    const refImageUri = useRef(imageUri);
    const refTokenName = useRef(tokenName);
    const refTokenDescription = useRef(tokenDescription);

    //abi formatting.............
const marketPlaceAbi = nftMarketPlaceAbi[chainString]["NftMarketPlace"];
const  nftAbi = abi[chainString]["BasicNft"]; 


    useEffect(() => {
        if (!isWeb3Enabled || chainId === undefined) return;

        async function updateUi() {
            const tokenURI = await readContract(config, {
                abi: nftAbi,
                address: nftAddress,
                functionName: "tokenURI",
                args: [tokenId],
            });

            try {
                if (tokenURI) {
                    const requestURL = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");
                    const tokenURLResponse = await fetch(requestURL).then((res) => res.json());

                    // Check if the value has changed before updating state
                    if (refImageUri.current !== tokenURLResponse.image) {
                        refImageUri.current = tokenURLResponse.image;
                        setImageUri(tokenURLResponse.image.replace("ipfs://", "https://ipfs.io/ipfs/"));
                    }
                    if (refTokenName.current !== tokenURLResponse.name) {
                        refTokenName.current = tokenURLResponse.name;
                        setTokenName(tokenURLResponse.name);
                    }
                    if (refTokenDescription.current !== tokenURLResponse.description) {
                        refTokenDescription.current = tokenURLResponse.description;
                        setTokenDescription(tokenURLResponse.description);
                    }
                } else {
                    console.error("Token URI is empty or undefined.");
                }
            } catch (error) {
                console.error("Error fetching token URI or metadata:", error);
            }
        }

        updateUi();
    }, [isWeb3Enabled, chainId, tokenId, nftAddress]); // Only depend on these values


    const { runContractFunction: buyItem } = useWeb3Contract({
        abi: marketPlaceAbi,
        contractAddress: nftMarketPlaceAddress,
        functionName: "buyItem",
        msgValue: price,
        params: {
            nftAddress: nftAddress,
            tokenId: tokenId,
        },
    })

    

    const isOwnedByUser =
    ethers.utils.getAddress(seller) === ethers.utils.getAddress(accounts.address) ||
    seller === undefined;
    const formattedSellerAddress = isOwnedByUser ? "you" : truncateStr(seller || "", 15)


console.log("Owner is HEREEEEE",isOwnedByUser)
console.log("SELLER : ",seller)
console.log("ACCOUNTS : ",accounts.address)
console.log("Web3Enabled",isWeb3Enabled)



const handleCardClick = () =>{
    isOwnedByUser 
    ? setShowModal(true) // We are setting " showModal " to true, so in " return statement " we are passing " showModal " in isVisible => UpdateListingModal. So " showModal " is depending on " isOwnedByUser "
    : buyItem({
        onError: (error) => console.log(error),
        onSuccess: () => handleBuyItemSuccess(),
      })
    }

    //handleBuyItemSuccess function
    const handleBuyItemSuccess = () =>{
        dispatch({
            type: "success",
            message: "Item Bought!",
            title: "Item Bought",
            position: "topR",
        })
    }
    return (
        <div className="mx-3 my-3">
            <div>
                {imageUri ? (
                    <div>
                        {nftMarketPlaceAddress && (

                        <UpdateListingModal
                        nftAddress={nftAddress}
                        tokenId={tokenId}
                        isVisible={showModal}
                        nftMarketPlaceAddress={nftMarketPlaceAddress}
                        onClose={hideModal}           
                        />
                    )}

                        <Card
                        title={tokenName}
                        description={tokenDescription}
                        onClick={handleCardClick}
                        >
                        <div className="p-2">
                            <div className="flex flex-col item-end gap-2">
                                <div>#{tokenId}</div>
                                <div className="italic text-sm">
                                    Owned by {formattedSellerAddress}
                                </div>
                                <Image
                                loader={() => imageUri}
                                src={imageUri}
                                height="200"
                                width="200"
                                alt="Missing TokenURI From NFTBox"
                                />
                                <div className="font-bold">
                                    {ethers.utils.formatUnits(price, "ether")} ETH
                                </div>
                            </div>
                        </div>
                        </Card>
                    </div>
                ) : (
                    <div>Loading from NFTBox...</div>
                )}
            </div>
        </div>
    )

}




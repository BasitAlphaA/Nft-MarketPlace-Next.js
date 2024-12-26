import {Modal, Input, useNotification} from "web3uikit"
import { useState } from "react"
import {useWeb3Contract} from "react-moralis"
import nftMarketPlaceAbi from "../constants/marketPlaceABI.json"
import { ethers } from "ethers"


const marketPlaceAbi = nftMarketPlaceAbi["11155111"]["NftMarketPlace"];



export default function UpdateListingModal({
    nftAddress,
    tokenId,
    isVisible,
    nftMarketPlaceAddress,
    onClose,
}) {
    const dispatch = useNotification()

    const [priceToUpdateListingWith, setPriceToUpdateListingWith] = useState("")

    const handleUpdateListingSuccess = async()=>{
     dispatch({
        type: "success",
        message: "Listing Updated",
        title: "Listing updated  - please refresh( and move blocks)",
        position: "topR",
     })
     onClose && onClose()
     setPriceToUpdateListingWith("0")
    }

    const { runContractFunction: updateListing} = useWeb3Contract({
        abi: marketPlaceAbi,
        contractAddress: nftMarketPlaceAddress,
        functionName: "updateListing",
        params: {
            nftAddress: nftAddress,
            tokenId: tokenId,
            newPrice: ethers.utils.parseEther(priceToUpdateListingWith || "0")
        },
    })

    return (
      <Modal
          isVisible={isVisible}
          onCancel={onClose}
          onCloseButtonPressed={onClose}
          onOk={() => {
              updateListing({
                  onError: (error) => console.log(error),
                  onSuccess: () => handleUpdateListingSuccess(),
              });
          }}
          className="flex items-center justify-center" // Centers modal using Tailwind
      >
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-6">
              <Input
                  label="Update listing price in L1 Currency (ETH)"
                  name="New listing price"
                  type="number"
                  onChange={(event) => {
                      const value = event.target.value;
                      if (!isNaN(value) && parseFloat(value) >= 0) {
                          setPriceToUpdateListingWith(value);
                      } else {
                          console.log("Invalid input: Price must be a positive number");
                      }
                  }}
              />
          </div>
      </Modal>
  );
}

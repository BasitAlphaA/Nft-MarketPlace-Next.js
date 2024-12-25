"use client"
import { ConnectButton } from "web3uikit";
import Link from "next/link";

export default function Header(){
    return (
        <nav className="p-5 border-b-2 flex flex-row justify-between items-center"
        >
            <h1 className="py-4 px-4 italic text-4xl font-bold	 text-teal-700">NFT Marketplace</h1>
            <div className="flex flex-row items-center">
            <Link legacyBehavior href="/">
            <a  className="mr-4 p-6 italic text-3xl font-medium	 text-teal-700">Home </a>
            </Link>
            <Link legacyBehavior href="/sell-nft">
            <a  className="mr-4 p-6 italic text-3xl font-medium	 text-teal-700">Sell NFT </a>
            </Link>
    <ConnectButton moralisAuth={false}/>
    </div>
    </nav>
)
}
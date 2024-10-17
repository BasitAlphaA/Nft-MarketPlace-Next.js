"use client"

import Image from "next/image";
import "./globals.css";
// import Head from "next/head";


export default function Home() {
  const dAppMetadata = {
    name: "NFT Marketplace", // Replace with your dApp name
    url: "http://localhost:3000/", // Replace with your dApp URL
  };
  return (
    <div >
     {/* <Head>
     <title>Nft Marketplace</title>
      <metta name="description" content="Nft Marketplace"/>
      <link rel="icon" href="/favicon.ico"/>
     </Head> */}
     Hi!
    </div>
  );
}
// FIRSTLY, U NEED A DATA BASE OR MAYBE CALLED SERVER.....TO INDEX THE EVENTS OF UR MARKETPLACE
// BUT FOR THIS U NEED TO CONNECT UR DATABASE WITH UR CONTRACT AKA MARKETPLACE
// BY CREATING UR DATABASE U WILL GET WEBHOOK URL OF UR DATABASE WHICH U WILL STICK INTO MORALIS STREAM
// THEN HOPEFULLY THE MORALIS STREAM USED BY OUR FRONTEND TO SHOW STUFF ON APP BY LISTENING TO THE EVENT
//  
// SMART CONTRACT => DATABASE {IT'S WEBHOOK}  => MORALIS STREAM => FRONTEND { TO GET LOGS OF EVENTS SO FRONTEND KNOWS WHAT TO SHOW }
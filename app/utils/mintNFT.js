
"use client";

import { useState } from "react";
import { ethers } from "ethers";
import { getContract } from "@/app/utils/MyNFTCollection";



 export const mintNFT = async (mintPrice, setIsMinting) => {
    if (!window.ethereum) return alert("Please install MetaMask");

    try {
      setIsMinting(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = getContract(signer);

      const tx = await contract.mintNFT({
        value: ethers.utils.parseEther(mintPrice),
      });

      await tx.wait();
      alert("🎉 NFT minted successfully!");
      console.log("Transaction hash:", tx.hash);
    } catch (error) {
      console.error("❌ Error minting NFT:", error);
      alert("Error minting NFT. Please try again.");
    } finally {
      setIsMinting(false);
    }
  };



"use client";

import { useState } from "react";
import { ethers } from "ethers";
import { getContract } from "@/app/utils/MyNFTCollection";

export default function MintButton({ mintPrice = "0.01" }) {
  const [isMinting, setIsMinting] = useState(false);

  const mintNFT = async () => {
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

  return (
    <button
      onClick={mintNFT}
      disabled={isMinting}
      style={{
        padding: "12px 24px",
        fontSize: "16px",
        background: isMinting ? "#888" : "#111",
        color: "#fff",
        borderRadius: "8px",
        cursor: isMinting ? "not-allowed" : "pointer",
        border: "none",
      }}
    >
      {isMinting ? "Minting..." : `Mint NFT (${mintPrice} ETH)`}
    </button>
  );
}

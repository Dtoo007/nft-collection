"use client";

import { useState } from "react";
import { mintNFT } from "@/app/utils/mintNFT"; // Adjust the path to your mintNFT function

export default function MintButton({ mintPrice = "0.001" }) {
  const [isMinting, setIsMinting] = useState(false);

  return (
    <button
      onClick={() => mintNFT(mintPrice, setIsMinting)}
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

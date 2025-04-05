"use client";

import { useState } from "react";
import { mintNFT } from "@/app/components/mintNft";

export default function MintButton({ mintPrice = "0.01" }) {
  const [isMinting, setIsMinting] = useState(false);

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

"use client";

import { ethers } from "ethers";
import abi from "./abi.json"; // Adjust the path to your ABI file

export async function getContract(signer) {
  const contractAddress = "0x34c47cf8e002a0c5150816c55e9b0ece8a090049"; // Replace with your contract address
  const contractABI = abi;

  if (!signer) {
    throw new Error("Signer is needed to interact with the contract.");
  }
  return new ethers.Contract(contractAddress, contractABI, signer);
}

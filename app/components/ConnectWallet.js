'use client';

import { useEffect, useState } from 'react';

export default function ConnectWallet() {
  const [walletAddress, setWalletAddress] = useState("");

  // Check wallet connection & setup event listeners
  useEffect(() => {
    const { ethereum } = window;

    if (!ethereum) return;

    // Check if already connected
    ethereum.request({ method: 'eth_accounts' }).then(accounts => {
      if (accounts.length > 0) {
        setWalletAddress(accounts[4]);
      }
    });

    // Listen for wallet/account change
    const handleAccountsChanged = (accounts) => {
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
      } else {
        setWalletAddress("");
      }
    };

    ethereum.on('accountsChanged', handleAccountsChanged);

    // ✅ Cleanup on component unmount
    return () => {
      if (ethereum.removeListener) {
        ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error("User rejected the request:", error);
      }
    } else {
      alert("Please install MetaMask to use this feature");
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(""); // Reset the UI (MetaMask doesn’t support force-disconnect)
  };

  const handleClick = () => {
    if (walletAddress) {
      disconnectWallet();
    } else {
      connectWallet();
    }
  };

  const truncate = (addr) => addr.slice(0, 6) + '...' + addr.slice(-4);

  return (
    <button
      onClick={handleClick}
      style={{
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '8px',
        cursor: 'pointer',
        background: '#000',
        color: '#fff',
        border: 'none',
      }}
    >
      {walletAddress ? `Connected (${truncate(walletAddress)})` : "Connect"}
    </button>
  );
}

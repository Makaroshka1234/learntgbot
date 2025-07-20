'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { tonConnectUI } from '../utils/tonconnect-ui';

const Header = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    tonConnectUI.connectionRestored.then(() => {
      const account = tonConnectUI.account;
      if (account?.address) {
        setWalletAddress(account.address);
      }
    });

    tonConnectUI.onStatusChange((wallet) => {
      if (wallet) {
        setWalletAddress(wallet.account.address);
      } else {
        setWalletAddress(null);
      }
    });
  }, []);

  const connectWallet = async () => {
    await tonConnectUI.connectWallet();
  };

  const disconnectWallet = async () => {
    await tonConnectUI.disconnect();
  };

  return (
    <header className="flex justify-end items-center border border-gray-400 w-full">
      <ul className="flex items-center gap-3 px-2 py-2.5">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
        <li>
          <p>Bolt</p>
        </li>
        <li>
          {walletAddress ? (
            <button onClick={disconnectWallet} className="bg-red-400 px-3 py-1 rounded text-white">
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </button>
          ) : (
            <button onClick={connectWallet} className="bg-sky-400 px-3 py-1 rounded text-white">
              Connect wallet
            </button>
          )}
        </li>
      </ul>
    </header>
  );
};

export default Header;

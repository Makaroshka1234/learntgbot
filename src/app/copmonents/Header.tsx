'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { createTonConnectUI } from '../utils/tonconnect-ui';
import { TonConnectUI } from '@tonconnect/ui';

const Header = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [tonConnectUI, setTonConnectUI] = useState<TonConnectUI | null>(null);

  useEffect(() => {
    const ui = createTonConnectUI();
    setTonConnectUI(ui);

    ui.connectionRestored.then(() => {
      const account = ui.account;
      if (account?.address) {
        setWalletAddress(account.address);
      }
    });

    ui.onStatusChange((wallet) => {
      if (wallet) {
        setWalletAddress(wallet.account.address);
      } else {
        setWalletAddress(null);
      }
    });
  }, []);

  const connectWallet = async () => {
    if (tonConnectUI) {
      await tonConnectUI.connectWallet();
    }
  };

  const disconnectWallet = async () => {
    if (tonConnectUI) {
      await tonConnectUI.disconnect();
    }
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

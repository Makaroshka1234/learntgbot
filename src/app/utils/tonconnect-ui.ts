
import { TonConnectUI } from '@tonconnect/ui';

export function createTonConnectUI() {
  return new TonConnectUI({
    manifestUrl: 'https://learntgbot.vercel.app/tonconnect-manifest.json',
  });
}

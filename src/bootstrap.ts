import fs from 'fs';
import * as path from 'path';
import { BrowserContext, Page } from 'playwright-core';
import { launch, sessionPath } from './launch';
import { Dappwright, OfficialOptions } from './types';
import { getWallet, WalletOptions } from './wallets/wallets';

export const bootstrap = async (
  browserName: string,
  { seed, password, showTestNets, ...launchOptions }: OfficialOptions & WalletOptions,
): Promise<[Dappwright, Page, BrowserContext]> => {
  fs.rmSync(path.join(sessionPath, launchOptions.wallet), { recursive: true, force: true });
  const { browserContext } = await launch(browserName, launchOptions);
  const wallet = await getWallet(launchOptions.wallet, browserContext);
  await wallet.setup({ seed, password, showTestNets });

  return [wallet, wallet.page, browserContext];
};

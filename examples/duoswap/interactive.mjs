import { loadStdlib } from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';
import * as ask from '@reach-sh/stdlib/ask.mjs';
import { runManager, runListener, runListener_ } from './announcer.mjs';
import { runTokens } from './tokens.mjs';

// Track who withdrew/deposited
const withdrew  = {};
const deposited = {};
const traded = {};

const isAOrB = (a, b) => (ans) => {
  if (ans.toLowerCase() == a.toLowerCase()) {
    return a;
  }
  if (ans.toLowerCase() == b.toLowerCase()) {
    return b;
  }
  throw Error('Only `${a}` or `${b}` are valid answers.');
}

const fmt = (stdlib, x) => stdlib.formatCurrency(x, 4);

const getBalance = async (stdlib, tokenX, who) => {
  const amt = await stdlib.balanceOf(who, tokenX.id);
  return `${fmt(stdlib, amt)} ${tokenX.symbol}`; };

const getBalances = async (stdlib, who, tokA, tokB) =>
  `${await getBalance(stdlib, tokA, who)} & ${await getBalance(stdlib, tokB, who)}`;

const runDuoSwapAdmin = async (useTestnet) => {

  const stdlib = await loadStdlib();
  let accAdmin;
  if (useTestnet) {
    stdlib.setProviderByName('TestNet');
    const secret = await ask.ask(`What is your secret key?`);
    accAdmin = await stdlib.newAccountFromSecret(secret);
  } else {
    // Create & Fund Admin
    const startingBalance = stdlib.parseCurrency(9999);
    accAdmin = await stdlib.newTestAccount(startingBalance);
    await ask.ask(`Fund: ${accAdmin.getAddress()}`);
  }

  await accAdmin.setDebugLabel('Admin');
  const { tokA, tokB } = await ask.ask(`Enter token info:`, JSON.parse);

  // Deploy contract
  const ctcAdmin = accAdmin.deploy(backend);
  const ctcInfo = ctcAdmin.getInfo();
  const poolAddr = (await ctcInfo).toString();
  await ask.ask(`Enter Pool Address Into Announcer Manager: ${poolAddr}`);

  // Admin backend
  const adminBackend = backend.Admin(ctcAdmin, {
    tokA,
    tokB,
    shouldClosePool: async (_) => {
      const answer = await ask.ask(`Do you want to close the pool? (y/n)`, ask.yesno);
      return { when: answer, msg: null };
    },
  });

  await Promise.all([ adminBackend ]);
};

const runDuoSwapLP = async (useTestnet) => {

  const stdlib = await loadStdlib();
  let accProvider;
  if (useTestnet) {
    stdlib.setProviderByName('TestNet');
    const secret = await ask.ask(`What is your secret key?`);
    accProvider = await stdlib.newAccountFromSecret(secret);
  } else {
    // Create & Fund Provider
    const startingBalance = stdlib.parseCurrency(9999);
    accProvider = await stdlib.newTestAccount(startingBalance);
    const _ = await ask.ask(`Fund: ${accProvider.getAddress()}`);
  }

  await accProvider.setDebugLabel('Provider');
  if (stdlib.connector == 'ETH') {
    accProvider.setGasLimit(5000000);
  }

  // Connect to announcer and list pools:
  const listenerInfo = await ask.ask(`Paste Announcer Contract Info:`);
  console.log(`Searching for pools...`)
  try {
    const listener = await runListener_(stdlib, accProvider, listenerInfo);
    await Promise.all([ (new Promise(async (resolve, reject) => {
      const _ = await ask.ask(`Click \x1b[1m\`Enter\`\x1b[0m when done searching for pools.`);
      reject();
    })), listener() ]);
  } catch (e) { }

  const { tokA, tokB, poolAddr } = await ask.ask(`Enter connection info:`, JSON.parse);
  const ctcProvider = accProvider.attach(backend, poolAddr);

  const backendProvider = backend.Provider(ctcProvider, {
    log: (s, x) => { console.log(s.padStart(30), x.toString()); },
    withdrawDone: (isMe, amtOuts) => {
      if (isMe) {
        withdrew[accProvider] = true;
        console.log("\x1b[31m", `I withdrew ${amtOuts[0]} ${tokA.symbol} & ${amtOuts[1]} ${tokB.symbol}`,'\x1b[0m');
      }
    },
    withdrawMaybe: async ([ alive, market ]) => {
      const wantsToWithdraw = await ask.ask(`Do you want to withdraw liquidity? (y/n)`, ask.yesno);
      if (wantsToWithdraw) {
        const amt = await ask.ask(`How much liquidity do you want to withdraw?`);
        return { when: true, msg: { liquidity: amt } };
      } else {
        return { when: false, msg: { liquidity: 0 }};
      }
    },
    depositDone: (isMe, amtA, amtB, poolTokens) => {
      if (isMe) {
        deposited[accProvider] = poolTokens;
        console.log("\x1b[34m", `I received ${poolTokens} pool tokens for my deposit of ${amtA} ${tokA.symbol} & ${amtB} ${tokB.symbol}`,'\x1b[0m');
      }
    },
    depositMaybe: async ([ isAlive, market ]) => {
      const wantsToDeposit = await ask.ask(`Do you want to deposit? (y/n)`, ask.yesno);
      if (wantsToDeposit) {
        const myBals = await getBalances(stdlib, accProvider, tokA, tokB);
        const amtA = await ask.ask(`How much ${tokA.symbol} do you want to deposit? (Bal: ${myBals})`);
        const amtB = await ask.ask(`How much ${tokB.symbol} do you want to deposit? (Bal: ${myBals})`);
        const deposit = { amtA: stdlib.parseCurrency(amtA), amtB: stdlib.parseCurrency(amtB) }
        return {
          when: true, msg: deposit
        };
      } else {
        return { when: false, msg: { amtA: 0, amtB: 0 }};
      }
    },
  });

  await Promise.all([ backendProvider ]);
}

const runDuoSwapTrader = async (useTestnet) => {

  const stdlib = await loadStdlib();
  let accTrader;
  if (useTestnet) {
    stdlib.setProviderByName('TestNet');
    const secret = await ask.ask(`What is your secret key?`);
    accTrader = await stdlib.newAccountFromSecret(secret);
  } else {
    // Create & Fund Trader
    const startingBalance = stdlib.parseCurrency(9999);
    accTrader = await stdlib.newTestAccount(startingBalance);
    const _ = await ask.ask(`Fund: ${accTrader.getAddress()}`);
  }

  await accTrader.setDebugLabel('Trader');
  if (stdlib.connector == 'ETH') {
    accTrader.setGasLimit(5000000);
  }

  // Connect to announcer and list pools:
  const listenerInfo = await ask.ask(`Paste Announcer Contract Info:`);
  console.log(`Searching for pools...`)
  try {
    const listener = await runListener_(stdlib, accTrader, listenerInfo);
    await Promise.all([ (new Promise(async (resolve, reject) => {
      const _ = await ask.ask(`Click \x1b[1m\`Enter\`\x1b[0m when done searching for pools.`);
      reject();
    })), listener() ]);
  } catch (e) { }

  const { tokA, tokB, poolAddr } = await ask.ask(`Enter connection info:`, JSON.parse);
  const ctcTrader = accTrader.attach(backend, poolAddr);

  const backendTrader = backend.Trader(ctcTrader, {
    log: (s, x) => { console.log(s.padStart(30), x.toString()); },
    tradeDone: (isMe, [amtIn, amtInTok, amtOut, amtOutTok]) => {
      const tokIn  = amtInTok == tokA.id ? tokA : tokB;
      const tokOut = amtOutTok == tokA.id ? tokA : tokB;
      if (isMe) {
        traded[accTrader] = true;
        console.log("\x1b[32m", `I traded ${amtIn} ${tokIn.symbol} for ${amtOut} ${tokOut.symbol}`,'\x1b[0m');
      }
    },
    tradeMaybe: async ([ alive, market ]) => {
      const wantsToTrade = await ask.ask(`Do you want to trade? (y/n)`, ask.yesno);
      if (wantsToTrade) {
        const options = [tokA.symbol, tokB.symbol].join('\n');
        const tokType = await ask.ask(`What token do you want to input?\n${options}`, isAOrB(tokA.symbol, tokB.symbol));
        const myBal = await getBalance(stdlib, tokType === tokA.symbol ? tokA : tokB, accTrader);
        const amt = await ask.ask(`How much do you want to trade? (You have ${myBal})`);
        const trade =
          (tokType == tokA.symbol)
            ? ({ amtA: stdlib.parseCurrency(amt), amtB: 0, amtInTok: tokA.id })
            : ({ amtA: 0, amtB: stdlib.parseCurrency(amt), amtInTok: tokB.id });
        return { when: true, msg: trade };
      } else {
        return { when: false, msg: { amtA: 0, amtB: 0, amtInTok: tokA.id }};
      }
    },
  });

  await Promise.all([ backendTrader ]);
}

const bold = (s) => `\x1b[1m${s}\x1b[0m`
const faint = (s) => `\x1b[2m${s}\x1b[0m`

const options = [
  `1: ` + bold(`DuoSwap Pool Admin`) + `\n` + faint(`  * Create a pool for a pair of tokens`),
  `2: ` + bold(`DuoSwap Liquidity Provider`) + `\n` + faint(`  * Receive liquidity tokens by depositing tokens into a pool\n  * Withdraw liquidity from a pool`),
  `3: ` + bold(`DuoSwap Trader`) + `\n` + faint(`  * Trade one token for another in available pools`),
  `4: ` + bold(`DuoSwap Announcer`) + `\n` + faint(`  * Announces all the available pool addresses`),
  `5: ` + bold(`DuoSwap Listener`) + `\n` + faint(`  * Listens for all the available pool addresses`),
  `6: ` + bold(`DuoSwap Token Funder`) + `\n` + faint(`  * Create 2 tokens and fund any addresses you provide`),
].join('\n');

export const runInteractive = async (useTestnet) => {
  const answer = await ask.ask(`Who are you?\n${options}`, parseInt);

  switch (answer) {
    case 1: {
      // Creates a pool and sends info to announcer/cache
      await runDuoSwapAdmin(useTestnet);
      return;
    }
    case 2: {
      await runDuoSwapLP(useTestnet);
      return;
    }
    case 3: {
      await runDuoSwapTrader(useTestnet);
      return;
    }
    case 4: {
      await runManager(useTestnet);
      return;
    }
    case 5: {
      await runListener(useTestnet);
      return;
    }
    case 6: {
      await runTokens(useTestnet);
      return;
    }
  }
}

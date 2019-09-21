import {
  getContractABI,
  getContractAddress,
} from './tron-metadata';

let previousUserAddress = '';
let contract = null;

const tronWebInitialized = async (onAccountChanged) => {
  // Setup the contract handler when needed
  if (!contract) {
    contract = window.tronWeb.contract(getContractABI(), getContractAddress());
  }

  try {
    const { tronWeb } = window;
    const account = await tronWeb.trx.getAccount();
    const balanceInSun = await tronWeb.trx.getBalance();
    const address = tronWeb.address.fromHex(account.address);
    const voucherBalance = await contract.balanceOf(address).call();
    const voucherCount = voucherBalance.balance.toNumber();

    // Update the user redux state only when changes have been detected
    if (address !== previousUserAddress) {
      previousUserAddress = address;

      return onAccountChanged({
        address,
        balance: balanceInSun,
        voucherCount,
      });
    } else {
      return true;
    }
  } catch (error) {
    previousUserAddress = '';
    return false;
  }
};

const setupTronWeb = async (onAccountChanged) => {
  // Schedule a timer to keep polling the user state and handle it accordingly
  setInterval(() => {
    const { tronWeb } = window;
    const tronWebReady = !!tronWeb && !!tronWeb.ready;

    if (!tronWebReady) {
      previousUserAddress = '';
      return onAccountChanged(null);
    }

    return tronWebInitialized(onAccountChanged);
  }, 250);
};

const buyVoucher = async (voucherCount) => {
  const { tronWeb } = window;
  const account = await tronWeb.trx.getAccount();
  const address = tronWeb.address.fromHex(account.address);

  try {
    await contract.buyVoucher(address).send({
      callValue: 100000000 * voucherCount, // Rate for 1 voucher is currently hardcoded to 100 TRX
      shouldPollResponse: true,
    });

    // Get the latest voucherCount from the network
    const voucherBalance = await contract.balanceOf(address).call();
    const currentVoucherCount = voucherBalance.balance.toNumber();
    return { voucherCount: currentVoucherCount };
  } catch (err) {
    throw err;
  }
};

export {
  setupTronWeb,
  buyVoucher,
};

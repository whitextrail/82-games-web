import {
  getContractABI,
  getContractAddress,
} from './tron-metadata';

let previousUserAddress = '';
let contract = null;

const initUserInfo = async (onAccountChanged) => {
  if (!contract) {
    contract = window.tronWeb.contract(getContractABI(), getContractAddress());
    // const account = await window.tronWeb.trx.getAccount();
    // const address = window.tronWeb.address.fromHex(account.address);

    // try {
    //   const tx = await contract.buyVoucher(address).send({
    //     callValue: 100000000,
    //     shouldPollResponse: true,
    //   });
    //   console.log(tx);
    // } catch (err) {
    //   console.log(err);
    // }
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

    return initUserInfo(onAccountChanged);
  }, 250);
};

export {
  setupTronWeb,
};

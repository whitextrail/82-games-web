import {
  getLogicContractAddress,
  getTokenContractAddress,
  getLogicContractABI,
  getTokenContractABI,
} from './tron-metadata';

let currentUserAddress = '';
let logicContract = null;
let tokenContract = null;

// Tron hex addresses always starts by '41' on TronWeb, but it starts by '0x' inside the contract
// So we remove the '0x' prefix and append '41' to match the format in TronWeb
const convertToHex = (address) => `41${address.substring(2)}`;

const tronWebInitialized = async (onAccountChanged) => {
  // Setup the contract initializers if not yet initialized
  if (!logicContract) {
    logicContract = window.tronWeb.contract(getLogicContractABI(), getLogicContractAddress());
  }

  if (!tokenContract) {
    tokenContract = window.tronWeb.contract(getTokenContractABI(), getTokenContractAddress());
  }

  try {
    const { tronWeb } = window;
    const account = await tronWeb.trx.getAccount();
    const balanceInSun = await tronWeb.trx.getBalance();
    const address = tronWeb.address.fromHex(account.address);
    const voucherBalance = await tokenContract.balanceOf(address).call();
    const voucherCount = voucherBalance.toNumber();

    // Update the user redux state only when changes have been detected
    if (address !== currentUserAddress) {
      currentUserAddress = address;

      return onAccountChanged({
        address,
        balance: balanceInSun,
        voucherCount,
      });
    } else {
      return true;
    }
  } catch (error) {
    currentUserAddress = '';
    return false;
  }
};

const setupTronWeb = async (onAccountChanged) => {
  // Schedule a timer to keep polling the user state and handle it accordingly
  setInterval(() => {
    const { tronWeb } = window;
    const tronWebReady = !!tronWeb && !!tronWeb.ready;

    if (!tronWebReady) {
      currentUserAddress = '';
      return onAccountChanged(null);
    }

    return tronWebInitialized(onAccountChanged);
  }, 500);
};

const buyVoucher = async (voucherCount) => {
  // try {
  //   await logicContract.setTokenContract(getTokenContractAddress()).send();
  //   // await tokenContract.setLogicContract(getLogicContractAddress()).send();
  // } catch (err) {
  //   console.log(err);
  // };
  // return;
  try {
    await logicContract.buyVoucher(voucherCount).send({
      callValue: 100000000 * voucherCount, // Rate for 1 voucher is currently hardcoded to 100 TRX
      shouldPollResponse: true,
    });

    // Get the latest voucherCount from the network
    const voucherBalance = await tokenContract.balanceOf(currentUserAddress).call();
    const currentVoucherCount = voucherBalance.toNumber();
    return { voucherCount: currentVoucherCount };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const submitPrediction = async (prediction) => {
  try {
    const {
      gameId,
      points,
      rebounds,
      assists,
    } = prediction;

    await logicContract.submitPrediction(1, gameId, points, rebounds, assists).send({
      shouldPollResponse: true,
    });

    return getUserPredictions();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getUserPredictions = async () => {
  const { tronWeb } = window;

  try {
    const allEvents = await tronWeb.getEventResult(getLogicContractAddress(), {
      eventName: 'Predict',
    });
  
    const userEvents = [];
  
    allEvents.forEach((row) => {
      const { result } = row;
      const { player } = result;
  
      if (tronWeb.address.fromHex(convertToHex(player)) === currentUserAddress) {
        userEvents.push(result);
      }
    });
    console.log('Evt', userEvents);
    return userEvents;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export {
  setupTronWeb,
  buyVoucher,
  submitPrediction,
  getUserPredictions,
};

let previousUserAddress = '';

const initUserInfo = async (onAccountChanged) => {
  try {
    const account = await window.tronWeb.trx.getAccount();
    const balanceInSun = await window.tronWeb.trx.getBalance();
    const address = window.tronWeb.address.fromHex(account.address);

    // Update the user redux state only when changes have been detected
    if (address !== previousUserAddress) {
      previousUserAddress = address;

      return onAccountChanged({
        address,
        balance: balanceInSun,
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
    const tronWebReady = !!window.tronWeb && !!window.tronWeb.ready;

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

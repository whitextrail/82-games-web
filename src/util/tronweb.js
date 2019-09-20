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
  }
};

const setupTronWeb = async (onAccountChanged) => {
  const tronWebState = {
    installed: !!window.tronWeb,
    loggedIn: !!window.tronWeb && !!window.tronWeb.ready
  };

  // Schedule a timer to keep polling the user state and handle it accordingly
  setInterval(() => {
    tronWebState.installed = !!window.tronWeb;
    tronWebState.loggedIn = !!window.tronWeb && !!window.tronWeb.ready;
    // console.log(tronWebState.installed);
    // console.log(tronWebState.loggedIn);
    if (!tronWebState.installed || !tronWebState.loggedIn) {
      previousUserAddress = '';
      return onAccountChanged(null);
    }

    return initUserInfo(onAccountChanged);
  }, 250);
};

export {
  setupTronWeb,
};

const TronWeb = require('tronweb');

const initUserInfo = async () => {
  const account = await window.tronWeb.trx.getAccount();
  const balanceInSun = await window.tronWeb.trx.getBalance();
  const accountAddressInHex = account.address;
  console.log('Account', account);
  console.log('Address', window.tronWeb.address.fromHex(accountAddressInHex));
  console.log('Balance-TRX', window.tronWeb.fromSun(balanceInSun));
  return true;
};

const setupTronWeb = async () => {
  const tronWebState = {
    installed: !!window.tronWeb,
    loggedIn: !!window.tronWeb && !!window.tronWeb.ready
  };

  if (tronWebState.installed && tronWebState.loggedIn) {
    return initUserInfo();
  }

  let attempts = 0;

  // If no provider is readily usable, retry for another 10 times with slight delay
  const timer = setInterval(async () => {
    if (attempts >= 10) {
      // Manually setup a provider
      // We should be still handling the user as unauthenticated and alert them about it
      window.tronWeb = new TronWeb({
        fullNode: 'https://api.shasta.trongrid.io:8090',
        solidityNode: 'https://api.shasta.trongrid.io:8091',
        eventServer: 'https://api.shasta.trongrid.io',
      });

      return clearInterval(timer);
    }

    tronWebState.installed = !!window.tronWeb;
    tronWebState.loggedIn = window.tronWeb && window.tronWeb.ready;

    if (!tronWebState.installed || ! tronWebState.loggedIn) {
      return attempts++;
    }

    clearInterval(timer);
    return initUserInfo();
  }, 100);
};

module.exports = {
  setupTronWeb,
};

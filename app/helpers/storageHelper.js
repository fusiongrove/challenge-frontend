const DeviceStorage = require('react-device-storage');
const deviceStorage = () => {
  return new DeviceStorage({
    cookieFallback: true,
    cookie: {
      secure: true
    }
  });
};


const storageHelper = {
  getFromStorage: (key) => {
    const localData = deviceStorage().localStorage().read(key);
    const sessionData = deviceStorage().sessionStorage().read(key);
    return (localData) ? localData : sessionData;
  },
  addToStorage: (key, value) => {
    deviceStorage().localStorage().save(key, value);
    deviceStorage().sessionStorage().save(key, value);
  },
  getSession: (key) => {
    return deviceStorage().sessionStorage().read(key);
  },
  addToSession: (key, value) => {
    deviceStorage().sessionStorage().save(key, value);
  }
};
module.exports = storageHelper;
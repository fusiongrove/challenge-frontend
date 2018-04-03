const uuidV1 = require('uuid/v1');

const utilsHelper = {
  generateSlug: function (slice) {
    if (slice) {
      return uuidV1().slice(0, slice);
    } else  {
      return uuidV1();
    }
  },

};
module.exports = utilsHelper;
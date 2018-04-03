const jquery = require('jquery');

const httpHelper = {
  get: function (httpUrl, data, headers) {
    const ajaxPromise = jquery.ajax({
      url: httpUrl,
      method: "GET",
      data: data,
      headers: headers,
      crossDomain: true
    });

    return ajaxPromise;
  },

};
module.exports = httpHelper;
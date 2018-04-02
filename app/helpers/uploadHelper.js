const jquery = require('jquery');

const uploadHelper = {
  upload: function (dataImage) {
    const dataUpload = {
      upload_preset: config.CLOUDINARY_UPLOAD_PRESET,
      tags: 'browser_upload',
      file: dataImage
    };

    const ajaxPromise = jquery.ajax({
      url: `https://api.cloudinary.com/v1_1/${config.CLOUDINARY_CLOUD_NAME}/upload`,
      method: "POST",
      data: dataUpload,
      crossDomain: true
    });

    return ajaxPromise;
  },

};
module.exports = uploadHelper;
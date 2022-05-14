const Kavenegar = require('kavenegar');

module.exports = function () {
  return async context => {


    //console.log(context.result.id);
    const files = context.data.files;
    //console.log(files);

    for (const file of files) {
      await context.app.service('acceptFile').create({
        fileId: file,
        acceptId: context.result.id
      });
    }

    const api = Kavenegar.KavenegarApi({
      apikey: '5851696C716C452B7943595A45765152557476416B36797458426D534244447462636D557847683875664D3D'
    });

    api.VerifyLookup({
      receptor: '09121308516',
      token: context.result.userId,
      template: 'accept'
    }, function (response, status) {
      // console.log(response);
      // console.log(status);
    });

    api.VerifyLookup({
      receptor: '09123836621',
      token: context.result.userId,
      template: 'accept'
    }, function (response, status) {
      // console.log(response);
      // console.log(status);
    });


  };
};

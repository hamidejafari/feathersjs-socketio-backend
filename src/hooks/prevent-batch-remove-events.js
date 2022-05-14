module.exports = function () {
  return async context => {
    if(context.id === null){
      throw new Error('مکان حذف بصورت گروهی وجود ندارد');
    }
  };
};

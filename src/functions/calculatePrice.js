module.exports = function calculatePrice(pricesRef,user,time,eventTypeId) {

  let chatPrice = pricesRef[0].chatPrice;
  let callPrice = pricesRef[0].callPrice;
  let facePrce = pricesRef[0].facePrice;

  let withoutTax = 0;
  if(eventTypeId === 1) withoutTax = time * chatPrice;
  if(eventTypeId === 2) withoutTax = time * facePrce;
  if(eventTypeId === 3) withoutTax = time * callPrice;

  return withoutTax + (withoutTax * 0.09);

};

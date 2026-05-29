/**
 * Kükürd miqdarının normativ yoxlaması
 * @param {number} S - Ölçülmüş kükürd miqdarı (mq/kq)
 * @param {number} S_norm - Normativ hədd (mq/kq)
 * @returns {{ compliant: boolean, difference: number, message: string }}
 */
const calculateSulfur = (S, S_norm) => {
  const compliant = S <= S_norm;
  const difference = parseFloat((S_norm - S).toFixed(2));

  return {
    compliant,
    difference,
    message: compliant
      ? 'Nəticə: Kükürd miqdarı normativə uyğundur'
      : 'Nəticə: Kükürd miqdarı normativə uyğun deyil',
  };
};

export default calculateSulfur;
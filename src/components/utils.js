module.exports = {
  nbAfterComma: (number, nb) => {
    return Math.round(number * 10 ** nb) / 10 ** nb;
  },
  firstUpperCase: (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
};

const formatPrice = (price) => {
    return price.toLocaleString("it-IT", { style: "currency", currency: "VND" });
  };
  
  module.exports = { formatPrice };
  
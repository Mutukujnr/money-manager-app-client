/**
 * Simple thousands separator function
 * Converts 12000 to "12,000"
 */
export const formatAmount = (amount) => {
  if (!amount && amount !== 0) return '0';
  
  return Number(amount).toLocaleString();
};


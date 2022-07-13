export const helper = {
  formatDisplayAccount(address) {
    const firstPart = address.slice(0, 6);
    const SecondPart = address.slice(-4);
    return `${firstPart}...${SecondPart}`;
  },
};

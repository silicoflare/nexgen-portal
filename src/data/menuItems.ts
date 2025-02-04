const menuItems: { [key: string]: { label: string; route: string }[] } = {
  admin: [
    {
      label: "Scan entry pass",
      route: "/scanpass",
    },
    {
      label: "Search by team no.",
      route: "/search",
    },
    {
      label: "Snacks log",
      route: "/snackslog",
    },
  ],
  vendor: [
    {
      label: "Scan food coupons",
      route: "/couponscan",
    },
    {
      label: "Important contacts",
      route: "/contacts",
    },
  ],
  participant: [
    {
      label: "Entry pass",
      route: "/entrypass",
    },
    {
      label: "Food coupons",
      route: "/foodcoupons",
    },
    {
      label: "Important contacts",
      route: "/contacts",
    },
  ],
};

export default menuItems;

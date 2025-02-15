const menuItems: { [key: string]: { label: string; route: string }[] } = {
  sudo: [
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
    {
      label: "Scan food coupons",
      route: "/couponscan",
    },
    {
      label: "Select Top 10 teams",
      route: "/top10",
    },
  ],
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
      label: "Important contacts",
      route: "/contacts",
    },
  ],
  snacks: [
    {
      label: "Snacks log",
      route: "/snackslog",
    },
    {
      label: "Important contacts",
      route: "/contacts",
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

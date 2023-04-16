const ROLE = {
  ADMIN: "admin",
  BASIC: "basic",
};

module.exports = {
  ROLE,
  users: [
    { id: 1, name: "barkha", role: ROLE.ADMIN },
    { id: 2, name: "abhay", role: ROLE.BASIC },
    { id: 3, name: "varsha", role: ROLE.BASIC },
  ],

  projects: [
    { id: 1, name: "barkha's Project", userId: 1 },
    { id: 2, name: "abhay's Project", userId: 2 },
    { id: 4, name: "ajay's Project", userId: 2 },
    { id: 3, name: "varsha's Project", userId: 3 },
  ],
};

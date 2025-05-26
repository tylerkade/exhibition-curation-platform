const users = [
  { user_id: 1, username: "ThisIsAUsername", name: "David" },
  { user_id: 2, username: "Test", name: "Test Name" },
  { user_id: 3, username: "EmptyUser", name: "No Name" },
];

const exhibits = [
  { id: 1, user_id: 1, name: "default exhibit" },
  { id: 2, user_id: 1, name: "Asian Culture" },
  { id: 3, user_id: 2, name: "default exhibit" },
  { id: 4, user_id: 2, name: "Test exhibit 1" },
  { id: 5, user_id: 2, name: "Test exhibit 2" },
  { id: 6, user_id: 3, name: "default exhibit" },
];

const exhibit_artworks = [
  { exhibit_id: 1, artwork_id: "M650937" },
  { exhibit_id: 1, artwork_id: "M37841" },
  { exhibit_id: 1, artwork_id: "A7988" },
  { exhibit_id: 2, artwork_id: "M51482" },
  { exhibit_id: 2, artwork_id: "A57703" },
  { exhibit_id: 2, artwork_id: "A81235" },
  { exhibit_id: 3, artwork_id: "M650937" },
  { exhibit_id: 3, artwork_id: "M37841" },
  { exhibit_id: 3, artwork_id: "A7988" },
  { exhibit_id: 3, artwork_id: "M51482" },
  { exhibit_id: 3, artwork_id: "A57703" },
  { exhibit_id: 4, artwork_id: "A81235" },
  { exhibit_id: 4, artwork_id: "M357187" },
  { exhibit_id: 5, artwork_id: "A20684" },
  { exhibit_id: 5, artwork_id: "A16568" },
  { exhibit_id: 5, artwork_id: "A14620" },
  { exhibit_id: 5, artwork_id: "A22" },
  { exhibit_id: 5, artwork_id: "A23098" },
  { exhibit_id: 5, artwork_id: "A24202" },
  { exhibit_id: 1, artwork_id: "M24927" },
  { exhibit_id: 1, artwork_id: "M206989" },
];

export { users, exhibits, exhibit_artworks };

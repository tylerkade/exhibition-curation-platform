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
  { exhibit_id: 1, artwork_id: "M650937", date_added: "2023-10-01T12:00:00Z" },
  { exhibit_id: 1, artwork_id: "A7988", date_added: "2023-10-01T12:01:00Z" },
  { exhibit_id: 2, artwork_id: "M51482", date_added: "2023-10-01T12:02:00Z" },
  { exhibit_id: 2, artwork_id: "A57703", date_added: "2023-10-01T12:03:00Z" },
  { exhibit_id: 2, artwork_id: "A81235", date_added: "2023-10-01T12:04:00Z" },
  { exhibit_id: 3, artwork_id: "M650937", date_added: "2023-10-01T12:05:00Z" },
  { exhibit_id: 3, artwork_id: "M37841", date_added: "2023-10-01T12:06:00Z" },
  { exhibit_id: 3, artwork_id: "A7988", date_added: "2023-10-01T12:07:00Z" },
  { exhibit_id: 3, artwork_id: "M51482", date_added: "2023-10-01T12:08:00Z" },
  { exhibit_id: 3, artwork_id: "A57703", date_added: "2023-10-01T12:09:00Z" },
  { exhibit_id: 4, artwork_id: "A81235", date_added: "2023-10-01T12:10:00Z" },
  { exhibit_id: 4, artwork_id: "M357187", date_added: "2023-10-01T12:11:00Z" },
  { exhibit_id: 5, artwork_id: "A20684", date_added: "2023-10-01T12:12:00Z" },
  { exhibit_id: 5, artwork_id: "A16568", date_added: "2023-10-01T12:13:00Z" },
  { exhibit_id: 5, artwork_id: "A14620", date_added: "2023-10-01T12:14:00Z" },
  { exhibit_id: 5, artwork_id: "A22", date_added: "2023-10-01T12:15:00Z" },
  { exhibit_id: 5, artwork_id: "A23098", date_added: "2023-10-01T12:16:00Z" },
  { exhibit_id: 5, artwork_id: "A24202", date_added: "2023-10-01T12:17:00Z" },
  { exhibit_id: 1, artwork_id: "M24927", date_added: "2023-10-01T12:18:00Z" },
  { exhibit_id: 1, artwork_id: "M206989", date_added: "2023-10-01T12:19:00Z" },
];

export { users, exhibits, exhibit_artworks };

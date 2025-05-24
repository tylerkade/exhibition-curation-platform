const users = [
  {
    user_id: 1,
    username: "ThisIsAUsername",
    name: "David",
    exhibits: [
      {
        name: "default",
        artworks: ["M650937", "M37841", "A7988"],
      },
      {
        name: "Asian Culture",
        artworks: ["M51482", "A57703", "A81235"],
      },
    ],
  },
];

// Will try above formatting first
// exhibits: [
//       {
//         name: "default",
//         artworks: [
//           { api: "MET", id: 650937 },
//           { api: "MET", id: 37841 },
//           { api: "ARTIC", id: 7988 },
//         ],
//       },

export { users }
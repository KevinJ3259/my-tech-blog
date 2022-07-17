const User = require("./User");
const List = require("./List");
const Movie = require("./Movie");

// User.hasMany(List, {
//   foreignKey: "user_id",
// });

// List.belongsTo(User, {
//   foreignKey: "user_id",
// }),
//   List.hasMany(Movie, {
//     foreignKey: "list_id",
//   });

// Movie.belongsTo(List, {
//   foreignKey: "list_id",
// });

module.exports = { Movie, User, List };

module.exports = function userController(
  db,
  checkPassword,
  getToken,
  jwtSecret,
  jwtOptions,
  jwt,
  authorization
) {
  /** handle request to /pet */
  var getPet = async (req) => {};
  var putPet = async (req) => {};
  var deletePet = async (req) => {};

  /** handle request to /pets */
  var getPets = async (req) => {};
  var putPets = async (req) => {};
  var deletePets = async (req) => {};

  /** handle request to /pet/:id */
  var getPetById = async (req) => {};
  var putPetById = async (req) => {};
  var deletePetById = async (req) => {};

  return {};
};

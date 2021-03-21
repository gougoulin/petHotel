const canGetUsers = (permission) => {
  return permission >= 2;
};

module.exports = {
  canGetUsers,
};

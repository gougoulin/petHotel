module.exports = function userController(
  db,
  checkPassword,
  getToken,
  jwtSecret,
  jwtOptions,
  jwt,
  authorization
) {
  /** handle request to /customer/:id */
  const getCustomerById = async (req) => {};
  const putCustomerById = async (req) => {};
  const deleteCustomerById = async (req) => {};

  /** handle request to /customers */
  const getCustomers = async (req) => {};
  const putCustomers = async (req) => {};
  const deleteCustomers = async (req) => {};

  return {
    getCustomerById,
    putCustomerById,
    deleteCustomerById,
    getCustomers,
    putCustomers,
    deleteCustomers,
  };
};

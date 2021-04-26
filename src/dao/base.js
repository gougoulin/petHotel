module.exports = (function Base() {
  /**
   *
   */
  function read() {}

  /**
   * @param {object} record
   */
  function insertNewRecord(record) {}

  /**
   * @param {string} id
   * @returns {promise}
   */
  function getRecordById(id) {
    return this.findById(id);
  }

  /**
   * @returns {promise}
   */
  function getAllRecords() {
    return this.findAll();
  }

  /**
   * @param {object} target
   */
  function getOneRecord(where) {
    // check if item exist
    console.log("base dao getOneRecord running");
    console.log("this: ", this);
    // return this.findOne(target);
    return this.findOne(where);
  }

  /**
   *
   * @param {object} record
   * @returns {promise}
   */
  function insertOneRecord(record) {
    console.log("insertOneRecord running, this is", this, record);
    return this.create(record);
    // resp
    //   .then((data) => {
    //     console.log(typeof data, data);
    //     return data;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  function findOrCreateRecord(where, record) {
    return this.findOrCreate({
      where: where,
      defaults: record,
    });
  }
  /**
   *
   */
  function update() {}
  /**
   *
   */
  function del() {}

  return {
    getOneRecord,
    insertOneRecord,
    findOrCreateRecord,
  };
})();

const DataType = Object.freeze({
  // Numeric Data Types
  TINYINT: "TINYINT",
  SMALLINT: "SMALLINT",
  MEDIUMINT: "MEDIUMINT",
  INT: "INT",
  INTEGER: "INTEGER",
  BIGINT: "BIGINT",
  FLOAT: "FLOAT",
  DOUBLE: "DOUBLE",
  DECIMAL: "DECIMAL",

  // Character Data Types
  CHAR: "CHAR",
  VARCHAR: "VARCHAR",
  TEXT: "TEXT",
  TINYTEXT: "TINYTEXT",
  MEDIUMTEXT: "MEDIUMTEXT",
  LONGTEXT: "LONGTEXT",

  // Binary Data Types
  BLOB: "BLOB",
  TINYBLOB: "TINYBLOB",
  MEDIUMBLOB: "MEDIUMBLOB",
  LONGBLOB: "LONGBLOB",

  // Date and Time Data Types
  DATE: "DATE",
  DATETIME: "DATETIME",
  TIMESTAMP: "TIMESTAMP",
  TIME: "TIME",
  YEAR: "YEAR",

  // Other Data Types
  BOOLEAN: "BOOLEAN",
  ENUM: "ENUM",
  SET: "SET",
  JSON: "JSON",
});

module.exports = DataType;

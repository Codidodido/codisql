const mysql = require("mysql");

class SQL {
  constructor(dict) {
    this.host = dict["host"];
    this.user = dict["user"];
    this.password = dict["password"];
    this.database = dict["database"];
    this.debug = dict["debug"];
    this.sql = mysql.createConnection({
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.database,
    });
    this.sql.connect((err) => {
      if (this.debug == 1) {
        if (err) {
          console.log(err);
        } else {
          console.log("Connected!");
        }
      }
    });
  }

  do(query, callback) {
    return new Promise((success, failure) => {
      this.sql.query(query, (err, result) => {
        if (err) {
          failure(err);
        } else {
          success(result);
        }
      });
    });
  }

  find(table, where) {
    let whereClause =
      Object.keys(where).length > 0
        ? Object.entries(where)
            .map(([key, value]) => `${key} = ${mysql.escape(value)}`)
            .join(" AND ")
        : "1"; // to avoid syntax error if there are no conditions
    let query = `SELECT * FROM ${table} WHERE ${whereClause}`;
    return this.do(query);
  }

  insert(table, data) {
    let keys = Object.keys(data)
      .map((key) => mysql.escapeId(key))
      .join(", ");
    let values = Object.values(data)
      .map((value) => mysql.escape(value))
      .join(", ");

    let query = `INSERT INTO ${mysql.escapeId(
      table
    )} (${keys}) VALUES (${values})`;

    return this.do(query);
  }
  }
}

let test = new SQL({ host: "localhost", user: "root", password: "", database: "test", debug: 0 });
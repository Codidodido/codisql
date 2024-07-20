const mysql = require("mysql");

class Schema {
  /**
   * @param {SQL} sql
   */
  constructor(sql) {
    this.sql = sql;
    this.table = new Table(sql);
  }
  listTables() {
    const query = `SHOW TABLES`;
    return this.sql
      .do(query)
      .then((result) => result.map((row) => row.Tables_in_test));
  }
}

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
    this.schema = new Schema(this);
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

  update(table, where, data) {
    const whereClause = Object.entries(where)
      .map(([key, value]) => `${key} = ${mysql.escape(value)}`)
      .join(" AND ");

    const setClause = Object.entries(data)
      .map(([key, value]) => `${mysql.escapeId(key)} = ${mysql.escape(value)}`)
      .join(", ");

    const query = `UPDATE ${mysql.escapeId(
      table
    )} SET ${setClause} WHERE ${whereClause}`;

    return this.do(query);
  }

  delete(table, where) {
    const whereClause = Object.entries(where)
      .map(([key, value]) => `${key} = ${mysql.escape(value)}`)
      .join(" AND ");

    const query = `DELETE FROM ${mysql.escapeId(table)} WHERE ${whereClause}`;

    return this.do(query);
  }

  increment(table, where, column, value) {
    return this.find(table, where).then((res) => {
      res.forEach((obj) => {
        const id = obj.id;
        const old_value = obj[column];
        const new_value = old_value + value;
        this.update(table, { id: id }, { [column]: new_value }).catch((err) =>
          console.log(err)
        );
      });
    });
  }

  count(table, where) {
    let whereClause =
      Object.keys(where).length > 0
        ? Object.entries(where)
            .map(([key, value]) => `${key} = ${mysql.escape(value)}`)
            .join(" AND ")
        : "1";
    let query = `SELECT COUNT(*) as count FROM ${mysql.escapeId(
      table
    )} WHERE ${whereClause}`;
    return this.do(query).then((result) => result[0].count);
  }
}

let test = new SQL({ host: "localhost", user: "root", password: "", database: "test", debug: 0 });
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
  }
}

let test = new SQL({ host: "localhost", user: "root", password: "", database: "test", debug: 0 });
import { DB } from "https://deno.land/x/sqlite/mod.ts";

export interface Field {
  field_name: string;
  field_type: string;
}

export class Model{

  db: any;
  table_name: string;
  field_list: Field[];

  constructor(database:any, table_name:string, field_list:Field[]){
    this.db = database;
    this.table_name = table_name;
    this.field_list = field_list;
    const sql = `CREATE TABLE IF NOT EXISTS ${this.table_name} ( ${this.describe_fields()} );`;
    console.log(sql);
    this.db.query(sql);
  }

  describe_fields(){
    console.log(this.field_list)
    return this.field_list.map(field => `${field.field_name} ${field.field_type}`).join(", ");
  }
  
  // list_fields(){
  //   return Object.entries(this.field_list).map(([key, value]) => `${key}`).join(", ");
  // }

  create(data:object){
    const fields = Object.keys(data).join(",");
    const values = Object.values(data).map(v=>`'${v}'`).join(",");
    // const placeholders = values.map(v=>'?').join(",");
    const sql = `INSERT INTO people (${fields}) VALUES (${values})`;
    console.log(sql);
    this.db.query(sql);
  }

  get(where:string=""){
    const sql = `SELECT * FROM ${this.table_name} ${where};`;
    console.log(sql);
    return [...this.db.query(sql).asObjects()];
  }
}

//const rows = [...db.query("SELECT name FROM users;").asObjects()];
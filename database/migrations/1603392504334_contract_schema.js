'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContractSchema extends Schema {
  up () {
    this.create('contracts', (table) => {
      table.increments()
      table
      .integer("hired_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("companies");
    table.string("contract").notNullable().unique();
    table.text("object", "longtext").notNullable();
    table.string("value_monthly").notNullable();
    table.date("start_date").notNullable();
    table.date("finish_date").notNullable();
    table.string("value_global").notNullable();
    table.string("modality").notNullable();
    table.string("supervisor").notNullable();
    table.string("status");
    table.string("additive");
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");

      table.timestamps()
    })
  }

  down () {
    this.drop('contracts')
  }
}

module.exports = ContractSchema

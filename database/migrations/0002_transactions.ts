import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Transactions extends BaseSchema {
  protected tableName = 'transactions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.date('date').notNullable()
      table.enum('type', ['income', 'expense']).notNullable()
      table.decimal('price', 12, 2).notNullable()
      table.decimal('balance_after', 12, 2).notNullable()
      table
        .integer('bank_account_id')
        .unsigned()
        .references('id')
        .inTable('bank_accounts')
        .onDelete('CASCADE')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

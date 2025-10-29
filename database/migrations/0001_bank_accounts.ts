import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class BankAccounts extends BaseSchema {
  protected tableName = 'bank_accounts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('account_name').notNullable()
      table.decimal('balance', 12, 2).notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

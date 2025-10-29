import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true }) public id: number
  @column() public date: Date
  @column() public type: 'income' | 'expense'
  @column() public price: number
  @column() public balance_after: number
  @column() public bank_account_id: number
}

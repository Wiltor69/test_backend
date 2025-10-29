import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class BankAccount extends BaseModel {
  @column({ isPrimary: true }) public id: number
  @column() public account_name: string
  @column() public balance: number
}

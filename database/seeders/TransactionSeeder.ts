import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Transaction from 'app/models/Transaction'
import BankAccount from 'app/models/BankAccount'
import { DateTime } from 'luxon'

export default class TransactionSeeder extends BaseSeeder {
  public async run() {
    const account = await BankAccount.create({ account_name: 'Main Account', balance: 0 })
    let balance = 0

    const transactions = Array.from({ length: 10000 }).map(() => {
      const type = Math.random() > 0.5 ? 'income' : 'expense'
      const price = Number.parseFloat((Math.random() * 1000).toFixed(2))
      balance = type === 'income' ? balance + price : balance - price

      return {
        date: DateTime.now()
          .minus({ days: Math.floor(Math.random() * 365) })
          .toISODate(),
        type,
        price,
        balance_after: balance,
        bank_account_id: account.id,
      }
    })

    await Transaction.createMany(transactions)
    account.balance = balance
    await account.save()
  }
}

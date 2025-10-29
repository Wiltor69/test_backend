import Redis from '@ioc:Adonis/Addons/Redis'
import Transaction from 'app/models/Transaction'
import BankAccount from 'app/models/BankAccount'

export default class TransactionsController {
  public async update({ params, request }) {
    const transaction = await Transaction.findOrFail(params.id)
    const newPrice = request.input('price')
    const diff = newPrice - transaction.price
    transaction.price = newPrice
    await transaction.save()

    await Redis.set(`transaction:${transaction.id}`, JSON.stringify(transaction))

    const nextTransactions = await Transaction.query()
      .where('bank_account_id', transaction.bank_account_id)
      .andWhere('id', '>', transaction.id)
      .orderBy('id')

    let balance = transaction.balance_after + diff
    for (const t of nextTransactions) {
      balance = t.type === 'income' ? balance + t.price : balance - t.price
      t.balance_after = balance
      await t.save()
      await Redis.set(`transaction:${t.id}`, JSON.stringify(t))
    }

    const account = await BankAccount.findOrFail(transaction.bank_account_id)
    account.balance = balance
    await account.save()

    return { message: 'Transaction updated and balances recalculated' }
  }
}
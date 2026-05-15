import { createClient } from '@/lib/supabase/server'
import { TransactionList } from '@/components/transactions/transaction-list'
import { type Transaction } from '@/types'
import { format } from 'date-fns'

export default async function TransactionsPage() {
  const supabase = await createClient()
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1

  const startDate = `${year}-${String(month).padStart(2, '0')}-01`
  const endDate = format(new Date(year, month, 0), 'yyyy-MM-dd')

  const { data } = await supabase
    .from('transactions')
    .select('*')
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date', { ascending: false })

  return (
    <div className="max-w-5xl mx-auto">
      <TransactionList initial={(data ?? []) as Transaction[]} />
    </div>
  )
}

import { createClient } from '@/lib/supabase/server'
import { SummaryCards } from '@/components/dashboard/summary-cards'
import { ExpensesChart } from '@/components/dashboard/expenses-chart'
import { RecentTransactions } from '@/components/dashboard/recent-transactions'
import { type Transaction, type Category } from '@/types'
import { format } from 'date-fns'

export default async function DashboardPage() {
  const supabase = await createClient()
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1

  const startDate = `${year}-${String(month).padStart(2, '0')}-01`
  const endDate = format(new Date(year, month, 0), 'yyyy-MM-dd')

  const { data: transactions } = await supabase
    .from('transactions')
    .select('*')
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date', { ascending: false })

  const txList = (transactions ?? []) as Transaction[]

  const totalReceitas = txList.filter((t) => t.type === 'receita').reduce((s, t) => s + t.amount, 0)
  const totalDespesas = txList.filter((t) => t.type === 'despesa').reduce((s, t) => s + t.amount, 0)
  const saldo = totalReceitas - totalDespesas

  // Build pie chart data from expenses by category
  const categoryMap: Record<string, number> = {}
  txList.filter((t) => t.type === 'despesa').forEach((t) => {
    categoryMap[t.category] = (categoryMap[t.category] ?? 0) + t.amount
  })
  const chartData = Object.entries(categoryMap).map(([name, value]) => ({ name: name as Category, value }))

  const recentTx = txList.slice(0, 5)

  const { ptBR: ptBRLocale } = await import('date-fns/locale/pt-BR')
  const monthName = format(now, 'MMMM yyyy', { locale: ptBRLocale })

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm capitalize mt-0.5">{monthName}</p>
      </div>

      <SummaryCards summary={{ totalReceitas, totalDespesas, saldo }} />

      <div className="grid lg:grid-cols-2 gap-6">
        <ExpensesChart data={chartData} />
        <RecentTransactions transactions={recentTx} />
      </div>
    </div>
  )
}

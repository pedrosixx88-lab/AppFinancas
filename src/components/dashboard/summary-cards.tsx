import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react'
import { DashboardSummary } from '@/types'

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

interface SummaryCardsProps {
  summary: DashboardSummary
}

export function SummaryCards({ summary }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card className="border-0 shadow-sm bg-white dark:bg-slate-800">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">Receitas</CardTitle>
          <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg">
            <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(summary.totalReceitas)}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Total do mês</p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm bg-white dark:bg-slate-800">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">Despesas</CardTitle>
          <div className="p-2 bg-red-50 dark:bg-red-900/30 rounded-lg">
            <TrendingDown className="h-4 w-4 text-red-500 dark:text-red-400" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-red-500 dark:text-red-400">{formatCurrency(summary.totalDespesas)}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Total do mês</p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm bg-white dark:bg-slate-800">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">Saldo</CardTitle>
          <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <Wallet className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
        </CardHeader>
        <CardContent>
          <p className={`text-2xl font-bold ${summary.saldo >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-red-500 dark:text-red-400'}`}>
            {formatCurrency(summary.saldo)}
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Receitas − Despesas</p>
        </CardContent>
      </Card>
    </div>
  )
}

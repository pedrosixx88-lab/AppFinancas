import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Transaction } from '@/types'

interface RecentTransactionsProps {
  transactions: Transaction[]
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-base font-semibold text-slate-700">Transações Recentes</CardTitle>
        <Link href="/transactions" className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
          Ver todas <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <p className="text-center text-slate-400 text-sm py-8">Nenhuma transação registrada.</p>
        ) : (
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <div className="flex items-center gap-3 min-w-0">
                  <Badge
                    variant="secondary"
                    className="text-xs shrink-0 bg-slate-100 text-slate-600 font-medium"
                  >
                    {tx.category}
                  </Badge>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">{tx.description}</p>
                    <p className="text-xs text-slate-400">
                      {format(new Date(tx.date + 'T00:00:00'), "d 'de' MMM", { locale: ptBR })}
                    </p>
                  </div>
                </div>
                <span className={`text-sm font-semibold shrink-0 ml-4 ${tx.type === 'receita' ? 'text-emerald-600' : 'text-red-500'}`}>
                  {tx.type === 'receita' ? '+' : '-'}{formatCurrency(tx.amount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

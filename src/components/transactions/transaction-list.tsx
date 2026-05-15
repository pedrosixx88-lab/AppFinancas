'use client'

import { useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Pencil, Trash2, Plus, FileDown, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { TransactionForm } from './transaction-form'
import { TransactionFilters, type Filters } from './transaction-filters'
import { type Transaction } from '@/types'
import { Card } from '@/components/ui/card'

interface TransactionListProps {
  initial: Transaction[]
}

function formatCurrency(v: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)
}

function exportCSV(transactions: Transaction[]) {
  const headers = ['Data', 'Descrição', 'Tipo', 'Categoria', 'Valor']
  const rows = transactions.map((t) => [
    t.date,
    `"${t.description.replace(/"/g, '""')}"`,
    t.type,
    t.category,
    t.amount.toFixed(2).replace('.', ','),
  ])
  const csv = [headers, ...rows].map((r) => r.join(';')).join('\n')
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `finanza-transacoes-${format(new Date(), 'yyyy-MM-dd')}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export function TransactionList({ initial }: TransactionListProps) {
  const supabase = createClient()
  const now = new Date()

  const [transactions, setTransactions] = useState<Transaction[]>(initial)
  const [filters, setFilters] = useState<Filters>({
    search: '',
    month: String(now.getMonth() + 1),
    year: String(now.getFullYear()),
    category: 'all',
    type: 'all',
  })
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Transaction | null>(null)
  const [deleting, setDeleting] = useState<Transaction | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [fetching, setFetching] = useState(false)

  const fetchTransactions = useCallback(async (f: Filters) => {
    setFetching(true)
    const month = f.month.padStart(2, '0')
    const startDate = `${f.year}-${month}-01`
    const daysInMonth = new Date(Number(f.year), Number(f.month), 0).getDate()
    const endDate = `${f.year}-${month}-${daysInMonth}`

    let query = supabase
      .from('transactions')
      .select('*')
      .gte('date', startDate)
      .lte('date', endDate)
      .order('date', { ascending: false })

    if (f.type !== 'all') query = query.eq('type', f.type)
    if (f.category !== 'all') query = query.eq('category', f.category)

    const { data, error } = await query
    setFetching(false)
    if (error) { toast.error('Erro ao buscar transações.'); return }
    setTransactions(data as Transaction[])
  }, [supabase])

  async function handleFilterChange(newFilters: Filters) {
    setFilters(newFilters)
    await fetchTransactions(newFilters)
  }

  async function handleDelete() {
    if (!deleting) return
    setDeleteLoading(true)
    const { error } = await supabase.from('transactions').delete().eq('id', deleting.id)
    setDeleteLoading(false)
    if (error) { toast.error('Erro ao excluir transação.'); return }
    toast.success('Transação excluída.')
    setDeleting(null)
    await fetchTransactions(filters)
  }

  function handleEdit(tx: Transaction) {
    setEditing(tx)
    setFormOpen(true)
  }

  function handleNew() {
    setEditing(null)
    setFormOpen(true)
  }

  const filtered = filters.search
    ? transactions.filter((t) => t.description.toLowerCase().includes(filters.search.toLowerCase()))
    : transactions

  const totalReceitas = filtered.filter((t) => t.type === 'receita').reduce((s, t) => s + t.amount, 0)
  const totalDespesas = filtered.filter((t) => t.type === 'despesa').reduce((s, t) => s + t.amount, 0)

  return (
    <div className="space-y-5">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Transações</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">{filtered.length} transação(ões) encontrada(s)</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => exportCSV(filtered)}
            disabled={filtered.length === 0}
          >
            <FileDown className="h-4 w-4" />
            Exportar CSV
          </Button>
          <Button size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700" onClick={handleNew}>
            <Plus className="h-4 w-4" />
            Nova transação
          </Button>
        </div>
      </div>

      {/* Filters */}
      <TransactionFilters filters={filters} onChange={handleFilterChange} />

      {/* Summary row */}
      <div className="flex flex-wrap gap-4 text-sm">
        <span className="text-emerald-600 font-semibold">Receitas: {formatCurrency(totalReceitas)}</span>
        <span className="text-slate-300 dark:text-slate-600">|</span>
        <span className="text-red-500 font-semibold">Despesas: {formatCurrency(totalDespesas)}</span>
        <span className="text-slate-300 dark:text-slate-600">|</span>
        <span className={`font-semibold ${totalReceitas - totalDespesas >= 0 ? 'text-blue-600' : 'text-red-500'}`}>
          Saldo: {formatCurrency(totalReceitas - totalDespesas)}
        </span>
      </div>

      {/* List */}
      <Card className="border-0 shadow-sm bg-white dark:bg-slate-800 overflow-hidden">
        {fetching ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-400 dark:text-slate-500">
            <p className="text-lg font-medium mb-1">Nenhuma transação encontrada</p>
            <p className="text-sm">Tente ajustar os filtros ou adicione uma nova transação.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50 dark:divide-slate-700">
            {filtered.map((tx) => (
              <div key={tx.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50/60 dark:hover:bg-slate-700/50 transition-colors group">
                <div className="flex-1 flex items-center gap-3 min-w-0">
                  <div>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{tx.description}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge variant="secondary" className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 font-normal">
                        {tx.category}
                      </Badge>
                      <span className="text-xs text-slate-400 dark:text-slate-500">
                        {format(new Date(tx.date + 'T00:00:00'), "d 'de' MMM, yyyy", { locale: ptBR })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className={`text-sm font-semibold ${tx.type === 'receita' ? 'text-emerald-600' : 'text-red-500'}`}>
                    {tx.type === 'receita' ? '+' : '-'}{formatCurrency(tx.amount)}
                  </span>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(tx)}>
                      <Pencil className="h-3.5 w-3.5 text-slate-400" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setDeleting(tx)}>
                      <Trash2 className="h-3.5 w-3.5 text-red-400" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Form Dialog */}
      <TransactionForm
        open={formOpen}
        onOpenChange={setFormOpen}
        editing={editing}
        onSuccess={() => fetchTransactions(filters)}
      />

      {/* Delete confirm */}
      <Dialog open={!!deleting} onOpenChange={(o) => !o && setDeleting(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Excluir transação</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir &quot;{deleting?.description}&quot;? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 mt-2">
            <Button variant="outline" className="flex-1" onClick={() => setDeleting(null)}>
              Cancelar
            </Button>
            <Button variant="destructive" className="flex-1" onClick={handleDelete} disabled={deleteLoading}>
              {deleteLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Excluir
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { CATEGORIES, type Transaction, type TransactionFormData, type TransactionType } from '@/types'
import { format } from 'date-fns'

interface TransactionFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  editing?: Transaction | null
  onSuccess: () => void
}

const defaultForm: TransactionFormData = {
  description: '',
  amount: 0,
  date: format(new Date(), 'yyyy-MM-dd'),
  type: 'despesa',
  category: 'Outros',
}

export function TransactionForm({ open, onOpenChange, editing, onSuccess }: TransactionFormProps) {
  const supabase = createClient()
  const [form, setForm] = useState<TransactionFormData>(
    editing
      ? { description: editing.description, amount: editing.amount, date: editing.date, type: editing.type, category: editing.category }
      : defaultForm
  )
  const [loading, setLoading] = useState(false)

  // Reset form when dialog opens/closes or editing changes
  function handleOpenChange(open: boolean) {
    if (open) {
      setForm(
        editing
          ? { description: editing.description, amount: editing.amount, date: editing.date, type: editing.type, category: editing.category }
          : defaultForm
      )
    }
    onOpenChange(open)
  }

  function set<K extends keyof TransactionFormData>(key: K, value: TransactionFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!form.description.trim()) return toast.error('Informe a descrição.')
    if (!form.amount || form.amount <= 0) return toast.error('Informe um valor válido.')
    if (!form.date) return toast.error('Informe a data.')

    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      toast.error('Sessão expirada. Faça login novamente.')
      setLoading(false)
      return
    }

    const payload = {
      description: form.description.trim(),
      amount: Number(form.amount),
      date: form.date,
      type: form.type,
      category: form.category,
    }

    const { error } = editing
      ? await supabase.from('transactions').update(payload).eq('id', editing.id)
      : await supabase.from('transactions').insert({ ...payload, user_id: user.id })

    setLoading(false)

    if (error) {
      toast.error('Erro ao salvar transação: ' + error.message)
      return
    }

    toast.success(editing ? 'Transação atualizada!' : 'Transação criada!')
    onSuccess()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{editing ? 'Editar transação' : 'Nova transação'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Type */}
          <div className="grid grid-cols-2 gap-2">
            {(['despesa', 'receita'] as TransactionType[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => set('type', t)}
                className={`py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                  form.type === t
                    ? t === 'receita'
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                      : 'bg-red-50 border-red-300 text-red-600'
                    : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                }`}
              >
                {t === 'receita' ? '+ Receita' : '− Despesa'}
              </button>
            ))}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              placeholder="Ex: Supermercado"
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              required
            />
          </div>

          {/* Amount */}
          <div className="space-y-1.5">
            <Label htmlFor="amount">Valor (R$)</Label>
            <Input
              id="amount"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="0,00"
              value={form.amount || ''}
              onChange={(e) => set('amount', parseFloat(e.target.value) || 0)}
              required
            />
          </div>

          {/* Date */}
          <div className="space-y-1.5">
            <Label htmlFor="date">Data</Label>
            <Input
              id="date"
              type="date"
              value={form.date}
              onChange={(e) => set('date', e.target.value)}
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <Label>Categoria</Label>
            <Select value={form.category} onValueChange={(v) => v && set('category', v as typeof form.category)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              {editing ? 'Salvar' : 'Criar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

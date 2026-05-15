'use client'

import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Search, X } from 'lucide-react'
import { CATEGORIES } from '@/types'

export interface Filters {
  search: string
  month: string
  year: string
  category: string
  type: string
}

interface TransactionFiltersProps {
  filters: Filters
  onChange: (filters: Filters) => void
}

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 5 }, (_, i) => String(currentYear - i))
const months = [
  { value: '1', label: 'Janeiro' },
  { value: '2', label: 'Fevereiro' },
  { value: '3', label: 'Março' },
  { value: '4', label: 'Abril' },
  { value: '5', label: 'Maio' },
  { value: '6', label: 'Junho' },
  { value: '7', label: 'Julho' },
  { value: '8', label: 'Agosto' },
  { value: '9', label: 'Setembro' },
  { value: '10', label: 'Outubro' },
  { value: '11', label: 'Novembro' },
  { value: '12', label: 'Dezembro' },
]

export function TransactionFilters({ filters, onChange }: TransactionFiltersProps) {
  function set(key: keyof Filters, value: string) {
    onChange({ ...filters, [key]: value })
  }

  function reset() {
    onChange({
      search: '',
      month: String(new Date().getMonth() + 1),
      year: String(new Date().getFullYear()),
      category: 'all',
      type: 'all',
    })
  }

  const isDirty =
    filters.search !== '' ||
    filters.category !== 'all' ||
    filters.type !== 'all'

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {/* Search */}
      <div className="relative flex-1 min-w-[180px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Buscar descrição..."
          value={filters.search}
          onChange={(e) => set('search', e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Month */}
      <Select value={filters.month} onValueChange={(v) => v && set('month', v)}>
        <SelectTrigger className="w-36">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {months.map((m) => (
            <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Year */}
      <Select value={filters.year} onValueChange={(v) => v && set('year', v)}>
        <SelectTrigger className="w-24">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {years.map((y) => (
            <SelectItem key={y} value={y}>{y}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Type */}
      <Select value={filters.type} onValueChange={(v) => v && set('type', v)}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos tipos</SelectItem>
          <SelectItem value="receita">Receitas</SelectItem>
          <SelectItem value="despesa">Despesas</SelectItem>
        </SelectContent>
      </Select>

      {/* Category */}
      <Select value={filters.category} onValueChange={(v) => v && set('category', v)}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Categoria" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas categorias</SelectItem>
          {CATEGORIES.map((cat) => (
            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {isDirty && (
        <Button variant="ghost" size="sm" onClick={reset} className="gap-1 text-slate-500">
          <X className="h-3.5 w-3.5" />
          Limpar
        </Button>
      )}
    </div>
  )
}

import Link from 'next/link'
import { Wallet, Mail, AlertCircle, ArrowRight, Inbox } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface CheckEmailPageProps {
  searchParams: Promise<{ email?: string }>
}

export default async function CheckEmailPage({ searchParams }: CheckEmailPageProps) {
  const { email } = await searchParams

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2 text-slate-800 dark:text-slate-100">
            <div className="p-2 bg-blue-600 rounded-xl">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold">Finanza</span>
          </Link>
        </div>

        <Card className="border-0 shadow-xl overflow-hidden">
          {/* Top accent bar */}
          <div className="h-1.5 bg-gradient-to-r from-blue-500 via-blue-600 to-emerald-500" />

          <CardContent className="pt-10 pb-8 px-8 text-center">
            {/* Animated icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Mail className="h-9 w-9 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="absolute -top-1 -right-1 w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-800">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              Confirme seu e-mail
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8">
              Enviamos um link de confirmação para{' '}
              {email ? (
                <span className="font-semibold text-blue-600 dark:text-blue-400">{email}</span>
              ) : (
                'o seu e-mail'
              )}
              . Clique no link para ativar sua conta e começar a usar o Finanza.
            </p>

            {/* Steps */}
            <div className="space-y-3 mb-8 text-left">
              <div className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3.5">
                <div className="w-7 h-7 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">1</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Abra sua caixa de entrada</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Procure um e-mail do Finanza com o assunto "Confirme seu cadastro"
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3.5 border border-amber-100 dark:border-amber-800/30">
                <div className="w-7 h-7 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">Verifique o spam!</p>
                  <p className="text-xs text-amber-600 dark:text-amber-400 mt-0.5">
                    Às vezes nosso e-mail vai parar na pasta de <strong>spam ou lixo eletrônico</strong>. Não se esqueça de verificar lá também.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3.5">
                <div className="w-7 h-7 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">3</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Clique no link de confirmação</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Após confirmar, você poderá fazer login e usar todas as funcionalidades
                  </p>
                </div>
              </div>
            </div>

            {/* Inbox tip */}
            <div className="flex items-center gap-2.5 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3.5 mb-8 text-left">
              <Inbox className="h-5 w-5 text-blue-500 dark:text-blue-400 shrink-0" />
              <p className="text-xs text-blue-700 dark:text-blue-300">
                <span className="font-semibold">Dica:</span> Se não recebeu em até 5 minutos, tente cadastrar novamente ou entre em contato com o suporte.
              </p>
            </div>

            {/* CTA */}
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              Já confirmei, ir para o login
              <ArrowRight className="h-4 w-4" />
            </Link>

            <p className="text-xs text-slate-400 dark:text-slate-500 mt-4">
              Não recebeu o e-mail?{' '}
              <Link href="/register" className="text-blue-500 hover:underline">
                Tentar novamente
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

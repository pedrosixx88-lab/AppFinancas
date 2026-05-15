import Link from 'next/link'
import {
  Wallet,
  BarChart3,
  ShieldCheck,
  FileDown,
  PieChart,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-x-hidden transition-colors duration-300">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        body { font-family: 'DM Sans', sans-serif; }
        .font-display { font-family: 'Sora', sans-serif; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes floatCard {
          0%, 100% { transform: translateY(0px) rotate(1deg); }
          50%      { transform: translateY(-8px) rotate(1deg); }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: .5; transform: scale(.85); }
        }
        @keyframes barRise {
          from { transform: scaleY(0); opacity: 0; }
          to   { transform: scaleY(1); opacity: .8; }
        }

        .anim-fade-up   { animation: fadeUp .7s ease both; }
        .anim-fade-up-1 { animation: fadeUp .7s .12s ease both; }
        .anim-fade-up-2 { animation: fadeUp .7s .24s ease both; }
        .anim-fade-up-3 { animation: fadeUp .7s .36s ease both; }
        .anim-fade-in   { animation: fadeIn .9s .45s ease both; }
        .float-card     { animation: floatCard 5s ease-in-out infinite; }
        .pulse-dot      { animation: pulseDot 1.5s ease-in-out infinite; }

        .dot-grid {
          background-image: radial-gradient(circle, #cbd5e1 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .dark .dot-grid {
          background-image: radial-gradient(circle, #334155 1px, transparent 1px);
        }
        .glass-card {
          background: rgba(255,255,255,0.88);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.95);
        }
        .dark .glass-card {
          background: rgba(15,23,42,0.85);
          border: 1px solid rgba(51,65,85,0.8);
        }
        .feature-card { transition: transform .25s ease, box-shadow .25s ease; }
        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -8px rgba(30,64,175,.12);
        }
        .dark .feature-card:hover {
          box-shadow: 0 20px 40px -8px rgba(0,0,0,.4);
        }
        .cta-gradient {
          background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 60%, #0c4a6e 100%);
        }
        .bar { transform-origin: bottom; animation: barRise .55s ease both; }
      `}</style>

      {/* ── NAV ── */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="p-1.5 bg-blue-600 rounded-lg shadow-sm group-hover:bg-blue-700 transition-colors">
              <Wallet className="h-5 w-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Finanza</span>
          </Link>
          <nav className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/login" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              Entrar
            </Link>
            <Link href="/register" className="text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors">
              Começar grátis
            </Link>
          </nav>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="dot-grid absolute inset-0 opacity-50" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50 dark:bg-blue-950/30 rounded-full blur-3xl opacity-60" style={{ transform: 'translate(25%, -25%)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-50 dark:bg-emerald-950/30 rounded-full blur-3xl opacity-50" />

        <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="anim-fade-up inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full pulse-dot" />
              Gestão financeira pessoal
            </div>
            <h1 className="font-display anim-fade-up-1 text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight tracking-tight mb-6">
              Controle suas{' '}
              <span className="text-blue-600 dark:text-blue-400">finanças</span>
              <br />com inteligência
            </h1>
            <p className="anim-fade-up-2 text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-10 max-w-md">
              Registre receitas e despesas, visualize gráficos por categoria e acompanhe seu saldo em tempo real — tudo num só lugar.
            </p>
            <div className="anim-fade-up-3 flex flex-wrap gap-3">
              <Link href="/register" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5">
                Começar grátis
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/login" className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-semibold px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:-translate-y-0.5">
                Entrar
              </Link>
            </div>
            <div className="anim-fade-in mt-8 flex flex-wrap items-center gap-5">
              {['Sem cartão de crédito', 'Dados seguros', 'Gratuito'].map((item) => (
                <div key={item} className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Mock dashboard */}
          <div className="anim-fade-in relative hidden md:flex justify-center items-center">
            <div className="float-card relative w-full max-w-sm">
              <div className="glass-card rounded-2xl shadow-2xl shadow-blue-100 dark:shadow-black/40 p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Saldo atual</p>
                    <p className="font-display text-3xl font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                      R$&nbsp;4.280<span className="text-slate-400 text-xl font-normal">,50</span>
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/40 rounded-xl">
                    <Wallet className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-xl p-3.5">
                    <div className="flex items-center gap-1.5 mb-1">
                      <TrendingUp className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">Receitas</span>
                    </div>
                    <p className="font-display text-lg font-bold text-emerald-700 dark:text-emerald-400">R$&nbsp;7.500</p>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-3.5">
                    <div className="flex items-center gap-1.5 mb-1">
                      <TrendingDown className="h-3.5 w-3.5 text-red-500" />
                      <span className="text-xs font-medium text-red-600 dark:text-red-400">Despesas</span>
                    </div>
                    <p className="font-display text-lg font-bold text-red-600 dark:text-red-400">R$&nbsp;3.219</p>
                  </div>
                </div>

                {/* Mini bar chart */}
                <div>
                  <div className="flex items-end gap-1.5 h-14">
                    {[40, 65, 45, 80, 55, 70, 90].map((h, i) => (
                      <div key={i} className="flex-1">
                        <div
                          className="w-full rounded-t-sm bg-blue-500 bar"
                          style={{ height: `${h}%`, animationDelay: `${0.5 + i * 0.08}s` }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-1">
                    {['S','T','Q','Q','S','S','D'].map((d, i) => (
                      <span key={i} className="flex-1 text-center text-[10px] text-slate-400">{d}</span>
                    ))}
                  </div>
                </div>

                {/* Transactions */}
                <div className="space-y-2">
                  {[
                    { label: 'Supermercado', cat: 'Alimentação', amount: '-R$ 245', color: 'bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400' },
                    { label: 'Salário', cat: 'Receita', amount: '+R$ 6.000', color: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400' },
                    { label: 'Netflix', cat: 'Lazer', amount: '-R$ 55', color: 'bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400' },
                  ].map((tx) => (
                    <div key={tx.label} className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${tx.color}`}>{tx.cat}</span>
                        <span className="text-sm text-slate-700 dark:text-slate-300">{tx.label}</span>
                      </div>
                      <span className={`text-sm font-semibold font-display ${tx.amount.startsWith('+') ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'}`}>
                        {tx.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Badge */}
              <div className="glass-card absolute -top-5 -right-5 rounded-xl shadow-lg px-4 py-3 flex items-center gap-2.5">
                <PieChart className="h-7 w-7 text-blue-500" />
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Por categoria</p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Ver gráfico</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-3">Funcionalidades</p>
            <h2 className="font-display text-4xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Tudo que você precisa para<br />organizar suas finanças
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BarChart3, title: 'Dashboard visual', desc: 'Cards com saldo, receitas e despesas do mês. Visão consolidada em segundos.', bg: 'bg-blue-50 dark:bg-blue-900/20', ic: 'text-blue-600 dark:text-blue-400' },
              { icon: ShieldCheck, title: 'Controle de gastos', desc: 'Registre e edite transações com categoria, descrição e data. Histórico completo.', bg: 'bg-emerald-50 dark:bg-emerald-900/20', ic: 'text-emerald-600 dark:text-emerald-400' },
              { icon: PieChart, title: 'Gráficos por categoria', desc: 'Visualize onde seu dinheiro vai com gráficos de pizza interativos por categoria.', bg: 'bg-violet-50 dark:bg-violet-900/20', ic: 'text-violet-600 dark:text-violet-400' },
              { icon: FileDown, title: 'Exportar CSV', desc: 'Baixe suas transações filtradas em CSV para análise em planilhas externas.', bg: 'bg-amber-50 dark:bg-amber-900/20', ic: 'text-amber-600 dark:text-amber-400' },
            ].map(({ icon: Icon, title, desc, bg, ic }) => (
              <div key={title} className="feature-card bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm">
                <div className={`${bg} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className={`h-6 w-6 ${ic}`} />
                </div>
                <h3 className="font-display font-semibold text-slate-900 dark:text-slate-100 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 bg-[#f8fafc] dark:bg-slate-950 transition-colors">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-3">Como funciona</p>
          <h2 className="font-display text-4xl font-bold text-slate-900 dark:text-slate-100 tracking-tight mb-16">Simples como deve ser</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { step: '01', title: 'Crie sua conta', desc: 'Cadastro rápido com e-mail e senha. Seus dados ficam protegidos com RLS no Supabase.' },
              { step: '02', title: 'Registre transações', desc: 'Adicione receitas e despesas com categoria, valor e data. Em poucos segundos.' },
              { step: '03', title: 'Visualize o dashboard', desc: 'Acompanhe saldo, gráficos e relatórios. Filtre por período e exporte em CSV.' },
            ].map(({ step, title, desc }) => (
              <div key={step}>
                <div className="font-display text-7xl font-extrabold text-blue-100 dark:text-blue-900/60 leading-none mb-2 select-none">{step}</div>
                <h3 className="font-display text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 -mt-5">{title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="cta-gradient rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
            <div className="dot-grid absolute inset-0 opacity-10" />
            <div className="absolute top-0 left-1/2 w-[500px] h-[300px] bg-blue-400/20 rounded-full blur-3xl" style={{ transform: 'translateX(-50%)' }} />
            <div className="relative">
              <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                Pronto para começar?
              </h2>
              <p className="text-blue-200 text-lg mb-10 max-w-md mx-auto">
                Crie sua conta gratuita e comece a controlar suas finanças hoje mesmo.
              </p>
              <Link href="/register" className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-8 py-4 rounded-xl shadow-xl hover:bg-blue-50 transition-all hover:-translate-y-0.5 hover:shadow-2xl">
                Criar minha conta grátis
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 py-10 transition-colors">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-600 rounded-lg">
              <Wallet className="h-4 w-4 text-white" />
            </div>
            <span className="font-display font-bold text-slate-800 dark:text-slate-200">Finanza</span>
          </Link>
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Finanza · Gestão financeira pessoal
          </p>
          <div className="flex gap-4 text-sm text-slate-400">
            <Link href="/login" className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors">Entrar</Link>
            <Link href="/register" className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors">Cadastrar</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

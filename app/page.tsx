"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Disc,
  Mic,
  Video,
  Users,
  Globe,
  CheckCircle2,
  ArrowRight,
  PlayCircle
} from 'lucide-react'
import { Logo } from '@/components/logo'
import { LanguageSwitcher } from '@/components/language-switcher'
import { useLanguage } from '@/components/providers/language-provider'
import { motion, Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function LandingPage() {
  const { t } = useLanguage()

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const }
    }
  }

  return (
    <div className="min-h-screen bg-[#020817] text-white overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-cyan-900/10 rounded-full blur-[120px] animate-pulse delay-700" />
        <div className="absolute top-[40%] left-[20%] w-[30%] h-[30%] bg-indigo-900/5 rounded-full blur-[100px]" />
      </div>

      {/* Navbar */}
      <header className="relative z-50 border-b border-white/5 backdrop-blur-md bg-[#020817]/80 sticky top-0">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Logo className="scale-110" />
            <div className="hidden md:flex items-center gap-1">
              <span className="px-2 py-1 text-[10px] font-bold tracking-widest uppercase bg-white/5 border border-white/10 rounded text-cyan-500">
                Enterprise
              </span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <Link href="#features" className="hover:text-white transition-colors">{t('landing.features') || 'Recursos'}</Link>
            <Link href="#tech" className="hover:text-white transition-colors">Tecnologia</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">{t('landing.pricing') || 'Preços'}</Link>
          </nav>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link href="/login">
              <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/5 font-medium">
                {t('landing.login') || 'Área do Cliente'}
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-white text-[#020817] hover:bg-gray-100 font-bold px-6 shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all hover:scale-105">
                {t('landing.get_started') || 'Simular Setup'}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 font-sans">
        {/* HERO SECTION */}
        <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 pt-20 pb-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-5xl mx-auto space-y-8"
          >
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-cyan-400 mb-6 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                {t('authority_ib') || 'Um produto IB - Interpret Brasil'}
              </div>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
              {t('landing.hero_title_1')}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                {t('landing.hero_title_2')}
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
              {t('landing.hero_subtitle')}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-4 justify-center pt-8">
              <Button size="lg" className="h-14 px-8 text-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-full font-semibold shadow-[0_0_40px_-5px_rgba(6,182,212,0.5)] transition-all hover:scale-105">
                {t('landing.cta_demo') || 'Solicitar Demonstração'} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-full backdrop-blur-sm">
                {t('landing.cta_specialist') || 'Falar com Especialista'}
              </Button>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 text-sm"
          >
            <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent animate-pulse" />
          </motion.div>
        </section>

        {/* TECH VISUALIZATION */}
        <section id="tech" className="py-24 border-t border-white/5 bg-[#030712]/50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                {t('landing.tech_section_title') || 'Tecnologia Invisível'}
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                {t('landing.tech_section_desc') || 'Infraestrutura P2P dedicada.'}
              </p>
            </div>

            {/* Enhanced Tech Graphic - Interpretation Flow */}
            <div className="relative h-[450px] w-full max-w-5xl mx-auto rounded-3xl border border-white/10 bg-[#050b1d] overflow-hidden group shadow-2xl flex items-center justify-center">
              {/* World Map Background Effect */}
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, #1e293b 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
              <div className="absolute inset-0 bg-gradient-to-b from-[#020817]/0 via-[#020817]/50 to-[#020817]" />

              {/* Main Container */}
              <div className="relative z-10 w-full px-4 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">

                {/* Left Node: Speaker */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative group/node"
                >
                  <div className="w-64 h-40 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 shadow-2xl flex flex-col overflow-hidden relative backdrop-blur-sm">
                    {/* Fake Video Feed */}
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300&h=200')] bg-cover bg-center opacity-40 mix-blend-overlay group-hover/node:opacity-60 transition-opacity" />
                    <div className="absolute top-3 right-3 px-2 py-1 rounded bg-black/60 text-[10px] font-bold text-white flex items-center gap-1 backdrop-blur-md border border-white/5">
                      <Mic className="w-3 h-3 text-green-400" /> ON
                    </div>
                    <div className="mt-auto p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <div className="text-sm font-bold text-white">Speaker (CEO)</div>
                      <div className="text-xs text-blue-400 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span> New York • English
                      </div>
                    </div>
                  </div>
                  {/* Audio Waves Out */}
                  <div className="absolute top-1/2 -right-12 space-y-1 hidden md:block">
                    {[1, 2, 3].map(i => (
                      <motion.div
                        key={i}
                        animate={{ x: [0, 20, 0], opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                        className="w-8 h-1 rounded-full bg-blue-500/50"
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Center Node: Processing Core */}
                <div className="relative z-20 mx-4">
                  {/* Glowing Rings */}
                  <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
                  <div className="relative w-32 h-32 rounded-full border border-cyan-500/30 bg-[#020817]/80 backdrop-blur-xl flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.2)]">
                    <div className="absolute inset-0 rounded-full border border-cyan-500/10 border-dashed animate-[spin_10s_linear_infinite]" />
                    <div className="text-center p-2">
                      <Globe className="w-8 h-8 text-cyan-400 mx-auto mb-1 animate-pulse" />
                      <div className="text-[10px] font-bold text-cyan-300 uppercase tracking-widest">TalkTube<br />Core</div>
                    </div>
                  </div>
                  {/* Connecting Beams */}
                  <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent -z-10 w-[200%] -translate-x-[25%]" />
                </div>

                {/* Right Node: Listener */}
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative group/node"
                >
                  <div className="w-64 h-40 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 shadow-2xl flex flex-col overflow-hidden relative backdrop-blur-sm">
                    {/* Fake Video Feed */}
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=200')] bg-cover bg-center opacity-40 mix-blend-overlay group-hover/node:opacity-60 transition-opacity" />
                    <div className="absolute top-3 right-3 px-2 py-1 rounded bg-black/60 text-[10px] font-bold text-white flex items-center gap-1 backdrop-blur-md border border-white/5">
                      <div className="w-3 h-3 rounded-full border border-white/20 bg-[url('https://flagcdn.com/w40/br.png')] bg-cover" /> PT-BR
                    </div>
                    <div className="mt-auto p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <div className="text-sm font-bold text-white">Investor</div>
                      <div className="text-xs text-green-400 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span> São Paulo • Ouvindo
                      </div>
                    </div>
                  </div>
                  {/* Audio Waves In */}
                  <div className="absolute top-1/2 -left-12 space-y-1 hidden md:block">
                    {[1, 2, 3].map(i => (
                      <motion.div
                        key={i}
                        animate={{ x: [20, 0, 20], opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                        className="w-8 h-1 rounded-full bg-green-500/50"
                      />
                    ))}
                  </div>
                </motion.div>

              </div>
            </div>
          </div>
        </section>

        {/* PILLARS / CARDS */}
        <section id="features" className="py-32 relative">
          <div className="container mx-auto px-6">
            <div className="text-left mb-16">
              <div className="text-xs font-bold text-cyan-500 uppercase tracking-[0.2em] mb-4">
                Platform Features
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                {t('landing.features_title') || 'Funcionalidades da Plataforma'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 */}
              <div className="group p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 hover:-translate-y-2 hover:border-cyan-500/30">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Video className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                  {t('landing.feature_1_title')}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {t('landing.feature_1_desc')}
                </p>
              </div>

              {/* Card 2 */}
              <div className="group p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 hover:-translate-y-2 hover:border-cyan-500/30">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Mic className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors">
                  {t('landing.feature_2_title')}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {t('landing.feature_2_desc')}
                </p>
              </div>

              {/* Card 3 */}
              <div className="group p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 hover:-translate-y-2 hover:border-cyan-500/30">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Disc className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-amber-400 transition-colors">
                  {t('landing.feature_3_title')}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {t('landing.feature_3_desc')}
                </p>
              </div>

              {/* Card 4 */}
              <div className="group p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 hover:-translate-y-2 hover:border-cyan-500/30">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Users className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-emerald-400 transition-colors">
                  {t('landing.feature_4_title')}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {t('landing.feature_4_desc')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section id="pricing" className="py-24 bg-[#0a0f1e] border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                {t('landing.pricing_title') || 'Escolha seu Plano'}
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                {t('landing.pricing_subtitle') || 'Transparente. Sem surpresas.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Monthly Plan */}
              <div className="relative p-8 rounded-3xl border border-white/5 bg-[#020817] hover:border-white/20 transition-all flex flex-col">
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-400 mb-2">{t('landing.plan_monthly_name')}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">{t('landing.plan_monthly_price')}</span>
                    <span className="text-sm text-gray-500">{t('landing.plan_monthly_period')}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-4 h-10">{t('landing.plan_monthly_desc')}</p>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {[t('landing.plan_feature_1'), t('landing.plan_feature_2'), t('landing.plan_feature_3')].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-gray-600 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10">
                  {t('landing.button_subscribe')}
                </Button>
              </div>

              {/* Quarterly Plan */}
              <div className="relative p-8 rounded-3xl border border-cyan-500/30 bg-[#020817] shadow-[0_0_50px_rgba(6,182,212,0.05)] hover:border-cyan-500/50 transition-all transform md:-translate-y-4 flex flex-col z-10">
                <div className="absolute top-0 right-0 bg-cyan-500 text-[#020817] text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl">
                  POPULAR
                </div>
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-cyan-400 mb-2">{t('landing.plan_quarterly_name')}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-white">{t('landing.plan_quarterly_price')}</span>
                    <span className="text-sm text-gray-500">{t('landing.plan_quarterly_period')}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-4 h-10">{t('landing.plan_quarterly_desc')}</p>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {[t('landing.plan_feature_1'), t('landing.plan_feature_2'), t('landing.plan_feature_3'), t('landing.plan_feature_4')].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-white">
                      <CheckCircle2 className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg">
                  {t('landing.button_subscribe')}
                </Button>
              </div>

              {/* Yearly Plan */}
              <div className="relative p-8 rounded-3xl border border-white/5 bg-[#020817] hover:border-white/20 transition-all flex flex-col">
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-400 mb-2">{t('landing.plan_yearly_name')}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">{t('landing.plan_yearly_price')}</span>
                    <span className="text-sm text-gray-500">{t('landing.plan_yearly_period')}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-4 h-10">{t('landing.plan_yearly_desc')}</p>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {[t('landing.plan_feature_1'), t('landing.plan_feature_2') + ' Pro', t('landing.plan_feature_3') + ' Unlim.', t('landing.plan_feature_4')].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-gray-600 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10">
                  {t('landing.button_subscribe')}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST & AUTHORITY */}
        <section className="py-24 bg-[#0a0f1e]">
          <div className="container mx-auto px-6 text-center">
            <div className="mb-12">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-2">Powering</h4>
              <div className="text-2xl font-bold text-white flex items-center justify-center gap-3">
                <span className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center text-xs font-bold ring-2 ring-blue-500/20">IB</span>
                <span>{t('landing.authority_ib')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#020817] to-blue-950/20" />
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white tracking-tight">
              {t('landing.hero_title_2')}
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              {t('landing.hero_subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="h-16 px-10 text-lg bg-white text-[#020817] hover:bg-gray-100 rounded-full font-bold shadow-2xl hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] transition-all transform hover:-translate-y-1">
                {t('landing.get_started')}
              </Button>
              <span className="text-sm text-gray-500 px-4">ou</span>
              <Link href="/login" className="text-gray-400 hover:text-white underline underline-offset-4 decoration-gray-700 transition-colors">
                {t('landing.login')}
              </Link>
            </div>
            <p className="mt-12 text-xs text-gray-600 uppercase tracking-widest">
              {t('landing.footer_copyright')}
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Shield, Tv, Zap, Star } from 'lucide-react'
import { PaymentModal } from '../app/components/PaymentModal'
import { PixPayment } from '../app/components/PaymentButtonPix'
import { PaymentButton } from '../app/components/PaymentButton'
import YouTubePlayer from './components/Videos'

export default function LandingPage() {
  const [openModal, setOpenModal] = useState(false)
  const [showPix, setShowPix] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 via-transparent to-yellow-500/20" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block mb-4 rounded-full bg-green-500/10 px-4 py-1 text-sm text-green-400">
              Streaming esportivo oficial
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Futebol ao vivo, <span className="text-green-400">sem travar</span>, em qualquer dispositivo
            </h1>

            <p className="mt-6 text-lg text-neutral-300">
              Assista aos principais campeonatos com qualidade Full HD, suporte profissional e acesso imediato.
            </p>

           <div className="mt-8 flex gap-4">
            {/* Botão principal com gradiente verde escuro */}
            <Button
              size="lg"
              className="
                text-lg px-8 py-6 
                bg-gradient-to-r from-green-800 to-green-600 
                text-white rounded-lg 
                shadow-lg 
                hover:from-green-700 hover:to-green-500 
                hover:scale-105 hover:shadow-xl 
                transition transform duration-300
              "
              onClick={() => setOpenModal(true)} // opcional
            >
              Testar agora
            </Button>

            {/* Botão outline com efeito hover verde */}
            <Button
              size="lg"
              variant="outline"
              className="
                text-black px-8 py-6 rounded-lg border-2 border-green-800 
                hover:bg-gradient-to-r hover:from-green-800 hover:to-green-600 
                hover:text-white hover:scale-105 hover:shadow-lg 
                transition transform duration-300
              "
              onClick={() => setOpenModal(true)}
            >
              Ver planos
            </Button>
          </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
           
                
                   <YouTubePlayer url="https://youtu.be/7PolwI7sxp8?t=6" />
                
              
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {["+50.000 usuários", "99,9% uptime", "Suporte 24/7", "Pagamento seguro"].map((item) => (
            <div key={item} className="text-neutral-300 font-medium">{item}</div>
          ))}
        </div>
      </section>
      {/* BENEFÍCIOS */}
      <section className="py-24">
        {/* PROVAS DE CONFIANÇA */}
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Por que escolher nossa plataforma?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8 text-green-400" />,
                title: 'Transmissão rápida',
                desc: 'Baixa latência para você comemorar o gol em tempo real.',
              },
              {
                icon: <Shield className="w-8 h-8 text-green-400" />,
                title: 'Plataforma segura',
                desc: 'Streaming oficial com proteção de dados e pagamentos criptografados.',
              },
              {
                icon: <Star className="w-8 h-8 text-green-400" />,
                title: 'Experiência premium',
                desc: 'Qualidade HD/Full HD e suporte técnico profissional.',
              },
            ].map((b) => (
              <Card key={b.title} className="bg-neutral-900 border-neutral-800">
                <CardContent className="p-6">
                  {b.icon}
                  <h3 className="mt-4 text-xl font-semibold text-white">{b.title}</h3>
                  <p className="mt-2 text-neutral-400">{b.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL DE PAGAMENTO */}
      <PaymentModal
        open={openModal}
        onClose={() => {
          setOpenModal(false)
          setShowPix(false)
        }}
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Escolha o metodo de pagamento
        </h2>

        {/* EMAIL */}
       <div className="max-w-md mx-auto mb-10 bg-neutral-900 border border-green-600/40 rounded-2xl p-6 shadow-lg shadow-green-900/20">

  <h3 className="text-xl font-bold text-white mb-2">
    🚀 Libere seu acesso agora
  </h3>

  <p className="text-sm text-neutral-400 mb-4">
    Informe seu e-mail para continuar para o pagamento seguro.
  </p>

  <label 
    htmlFor="email" 
    className="block mb-2 text-sm font-semibold text-green-400"
  >
    Seu melhor e-mail
  </label>

  <input
    id="email"
    type="email"
    placeholder="exemplo@seuemail.com"
    className={`w-full rounded-xl bg-black border px-4 py-4 text-lg focus:outline-none transition-all
      ${error 
        ? 'border-red-500 focus:border-red-500' 
        : 'border-green-500 focus:border-green-400'
      }`}
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
  />

  <p className="mt-3 text-xs text-neutral-500">
    🔒 Seu e-mail está 100% seguro. Não enviamos spam.
  </p>

  {error && (
    <p className="mt-3 text-sm text-red-500 font-medium">
      {error}
    </p>
  )}
</div>


        {/* PLANO */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* PIX */}
          <div className="rounded-xl border border-green-600 bg-neutral-900 p-6 text-center">
            <h3 className="text-lg font-semibold">Vitalício</h3>
            <div className="my-4 text-3xl font-extrabold">R$ 20,00</div>

            <button
              onClick={() => {
                if (!email.trim()) {
                  setError("Por favor, informe um e-mail válido para continuar.");
                  return;
                }
                setError(null);
                setShowPix(true);
              }}
              className="w-full rounded-xl bg-green-600 py-3 font-semibold hover:bg-green-700"
            >
              Pagar com PIX
            </button>
            {error && (
            <p className="mt-2 text-sm text-red-500">
                {error}
              </p>
            )}
          </div>

          {/* CARTÃO */}
          <div className="rounded-xl border border-blue-600 bg-neutral-900 p-6 text-center">
            <h3 className="text-lg font-semibold">Vitalício</h3>
            <div className="my-4 text-3xl font-extrabold">R$ 20,00</div>

            <PaymentButton email={email} />
          </div>
        </div>

        {/* PIX QR */}
        {showPix && (
          <div className="mt-10">
            <PixPayment email={email} />
          </div>
        )}
      </PaymentModal>
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Comece a assistir hoje mesmo</h2>
          <p className="mt-4 text-neutral-300">Ativação imediata após o pagamento.</p>
          <Button
            onClick={() => setOpenModal(true)}
            size="lg"
            className="
              mt-8 px-10 py-6 text-lg 
              bg-gradient-to-r from-green-800 to-green-600 
              text-white rounded-lg 
              shadow-lg 
              hover:from-green-700 hover:to-green-500 
              hover:scale-105 hover:shadow-xl 
              transition transform duration-300
            "
          >
            Quero acesso agora
          </Button>
        </div>
      </section>

      <footer className="py-8 border-t border-neutral-800 text-center text-sm text-neutral-500">
        © 2025 Streaming Futebol • Todos os direitos reservados
      </footer>
    </main>
  )
}

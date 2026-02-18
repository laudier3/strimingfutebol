import { useEffect, useRef, useState } from 'react'
import { api } from '../services/tripeAPI'
import { gtag } from '../../lib/gtag'
interface PixPaymentProps {
  email: string
}

interface PixData {
  qr_code_base64: string
  qr_code: string
}

export const PixPayment = ({ email }: PixPaymentProps) => {
  const [loading, setLoading] = useState(true)
  const [pixData, setPixData] = useState<PixData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [paid, setPaid] = useState(false)

  // 🔒 evita conversão duplicada
  const conversionSent = useRef(false)

  // 🔥 GERA PIX
  useEffect(() => {
    if (!email) return

    const startPixPayment = async () => {
      try {
        const response = await api.post('/create-pix-payment', {
          email,
          amount: 1,
        })

        setPixData(response.data)
      } catch {
        setError('Erro ao gerar pagamento Pix')
      } finally {
        setLoading(false)
      }
    }

    startPixPayment()
  }, [email])

  // 🔁 VERIFICA PAGAMENTO
  useEffect(() => {
    if (!pixData || paid) return

    const interval = setInterval(async () => {
      try {
        const res = await api.get(
          `/payment-status?email=${encodeURIComponent(email)}`
        )

        if (res.data?.paid && !conversionSent.current) {
          conversionSent.current = true
          setPaid(true)
          clearInterval(interval)

          // ✅ CONVERSÃO GOOGLE ADS (SEM ERRO TS)
          gtag('event', 'conversion', {
            send_to: 'AW-16702751399/6Yw8CNb90-AbEKeFv5w-',
            transaction_id: `PIX_${email}_${Date.now()}`,
            value: 1,
            currency: 'BRL',
          })

          // ⏳ garante envio antes do redirect
          setTimeout(() => {
            window.location.href = 'https://apk.futemais.net/app2/'
          }, 800)
        }
      } catch {
        // erro silencioso
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [pixData, paid, email])

  const copyToClipboard = () => {
    if (!pixData) return
    navigator.clipboard.writeText(pixData.qr_code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return <p className="text-center">Gerando QR Code Pix...</p>
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>
  }

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950 flex items-center justify-center px-4">

      <div className="w-full max-w-md text-center bg-neutral-900 border border-green-600/40 rounded-2xl p-6 shadow-lg shadow-green-900/20">

        <h3 className="text-2xl font-bold text-white mb-2">
          💰 Finalize com PIX
        </h3>

        <p className="text-sm text-neutral-400 mb-4">
          Escaneie o QR Code abaixo para liberar seu acesso imediatamente.
        </p>

        <img
          src={`data:image/png;base64,${pixData?.qr_code_base64}`}
          alt="QR Code Pix"
          className="mx-auto mb-4 w-full max-w-[300px] aspect-square object-contain rounded-lg border border-green-500/30"
        />

        <button
          onClick={copyToClipboard}
          className="w-full mt-2 rounded-xl bg-green-600 hover:bg-green-700 py-3 font-semibold transition"
        >
          {copied ? '✅ Código copiado!' : 'Copiar código Pix'}
        </button>

        <div className="mt-6 text-sm">
          {paid ? (
            <p className="text-green-400 font-semibold">
              ✅ Pagamento aprovado! Redirecionando...
            </p>
          ) : (
            <p className="text-yellow-400 animate-pulse">
              ⏳ Aguardando confirmação do pagamento...
            </p>
          )}
        </div>

        <p className="mt-4 text-xs text-neutral-500">
          🔒 Pagamento 100% seguro via PIX
        </p>

      </div>
    </div>
  )
}

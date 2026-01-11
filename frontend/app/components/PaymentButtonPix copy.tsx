import { useEffect, useState } from 'react'
import { api } from '../services/tripeAPI'

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

  // 🔥 GERA PIX AUTOMATICAMENTE
  useEffect(() => {
    if (!email) return

    const startPixPayment = async () => {
      try {
        const response = await api.post('/create-pix-payment', {
          email,
          amount: 2000,
        })

        setPixData(response.data)
      } catch (err: any) {
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
        const res = await api.get(`/payment-status?email=${encodeURIComponent(email)}`)
        if (res.data?.paid) {
          setPaid(true)
          clearInterval(interval)
          window.location.href = 'https://apk.futemais.net/app2/'
        }
      } catch {}
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
    <div className="text-center">
      <h3 className="text-lg font-semibold mb-4">Escaneie o QR Code</h3>

      <img
        src={`data:image/png;base64,${pixData?.qr_code_base64}`}
        className="mx-auto mb-4 max-w-[260px]"
      />

      <button
        onClick={copyToClipboard}
        className="mt-2 rounded-xl border px-4 py-2 text-sm"
      >
        {copied ? 'Copiado!' : 'Copiar código Pix'}
      </button>

      <p className="mt-4 text-blue-400">
        {paid ? 'Pagamento aprovado!' : 'Aguardando pagamento...'}
      </p>
    </div>
  )
}

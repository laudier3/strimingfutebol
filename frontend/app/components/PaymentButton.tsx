import { useState, useEffect } from 'react' // 👈 adiciona useEffect
import { createCheckout } from '../services/tripeAPI'
import { gtag } from '../../lib/gtag'

interface PaymentButtonProps {
  email: string
}

export const PaymentButton = ({ email }: PaymentButtonProps) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // ✅ NOVO: Verificar automaticamente se já foi pago
  useEffect(() => {
    if (!email) return

    const checkPayment = async () => {
      try {
        const res = await fetch(
          `https://fut.urlcurt.site/payment-status?email=${email}`
        )
        const data = await res.json()

        if (data.paid) {
          window.location.href = "https://apk.futemais.net/app2/"
        }
      } catch (err) {
        console.error("Erro ao verificar pagamento:", err)
      }
    }

    checkPayment()
  }, [email])

  const handlePayment = async () => {
    setError(null)

    if (!email || !isValidEmail(email)) {
      setError("Por favor, informe um e-mail válido para continuar.")
      return
    }

    setLoading(true)

    try {
      const data = await createCheckout(email)

      if (!data?.checkoutUrl) {
        throw new Error('checkoutUrl não retornado')
      }

      gtag('event', 'conversion', {
        send_to: 'AW-16702751399/6Yw8CNb90-AbEKeFv5w-',
        transaction_id: `CARD_${email}_${Date.now()}`,
        value: 2,
        currency: 'BRL',
      })

      setTimeout(() => {
        window.location.href = data.checkoutUrl
      }, 800)

    } catch (err) {
      console.error('❌ Erro cartão:', err)
      setError('Erro ao iniciar pagamento com cartão.')
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full rounded-xl bg-blue-600 py-3 font-semibold hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Processando...' : 'Pagar com Cartão'}
      </button>

      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}

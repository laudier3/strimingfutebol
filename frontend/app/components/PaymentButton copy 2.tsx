import { useState } from 'react'
import { createCheckout } from '../services/tripeAPI'
import { gtag } from '../../lib/gtag'

interface PaymentButtonProps {
  email: string
}

export const PaymentButton = ({ email }: PaymentButtonProps) => {
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    if (!email || !email.includes('@')) {
      alert('Email inválido')
      return
    }

    setLoading(true)

    try {
      const data = await createCheckout(email)

      if (!data?.checkoutUrl) {
        throw new Error('checkoutUrl não retornado')
      }

      // ✅ DISPARA EVENTO GOOGLE ADS (INÍCIO DE CHECKOUT / COMPRA)
      gtag('event', 'conversion', {
        send_to: 'AW-16702751399/6Yw8CNb90-AbEKeFv5w-',
        transaction_id: `CARD_${email}_${Date.now()}`,
        value: 20,
        currency: 'BRL',
      })

      // ⏳ delay para garantir envio antes do redirect
      setTimeout(() => {
        window.location.href = data.checkoutUrl
      }, 800)

    } catch (err) {
      console.error('❌ Erro cartão:', err)
      alert('Erro ao iniciar pagamento com cartão')
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handlePayment}
      disabled={loading || !email.trim()}
      className="w-full rounded-xl bg-blue-600 py-3 font-semibold hover:bg-blue-700 disabled:opacity-50"
    >
      {loading ? 'Redirecionando...' : 'Pagar com Cartão'}
    </button>
  )
}

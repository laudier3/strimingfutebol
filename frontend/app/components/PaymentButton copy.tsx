import { useState } from 'react';
import { createCheckout } from '../services/tripeAPI';

interface PaymentButtonProps {
  email: string;
}

export const PaymentButton = ({ email }: PaymentButtonProps) => {
  const [loading, setLoading] = useState(false);

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

      window.location.href = data.checkoutUrl
    } catch (err) {
      console.error('❌ Erro cartão:', err)
      alert('Erro ao iniciar pagamento com cartão')
      setLoading(false) // 👈 destrava aqui
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
  );
};


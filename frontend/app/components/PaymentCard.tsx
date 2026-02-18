import React, { useState } from "react";

interface PaymentCardProps {
  title: string;
  logo: string;
  onSubmit?: (email: string) => void;
}

export const PaymentCard: React.FC<PaymentCardProps> = ({
  title,
  logo,
  onSubmit,
}) => {
  const [email, setEmail] = useState("");
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      alert("Informe um email válido");
      return;
    }

    try {
      setLoading(true);

      // ✅ CHAMADA PARA SUA API PIX
      const response = await fetch("https://SEU_BACKEND_URL/create-pix-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount: 200, // R$20,00
        }),
      });

      const data = await response.json();

      if (data.qr_code_base64) {
        setQrCode(data.qr_code_base64);
      }

      if (onSubmit) {
        onSubmit(email);
      }

    } catch (error) {
      console.error("Erro ao gerar PIX:", error);
      alert("Erro ao gerar PIX");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-card">
      <img src={logo} alt={title} className="payment-logo" />

      <input
        type="email"
        placeholder="Informe seu melhor email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Gerando PIX..." : "ACESSAR AGORA"}
      </button>

      {/* ✅ EXIBIR QR CODE */}
      {qrCode && (
        <div style={{ marginTop: 20 }}>
          <h3>Escaneie o QR Code para pagar</h3>
          <img
            src={`data:image/png;base64,${qrCode}`}
            alt="QR Code PIX"
            style={{ width: 250 }}
          />
        </div>
      )}
    </div>
  );
};

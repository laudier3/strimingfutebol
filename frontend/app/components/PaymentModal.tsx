'use client'

import { ReactNode } from 'react'
import { X } from 'lucide-react'

interface PaymentModalProps {
  open: boolean
  onClose: () => void
  children: ReactNode
}

export function PaymentModal({ open, onClose, children }: PaymentModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative z-50 w-full max-w-2xl rounded-2xl bg-neutral-950 p-6 border border-neutral-800">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-neutral-400 hover:text-white"
        >
          <X />
        </button>

        {children}
      </div>
    </div>
  )
}

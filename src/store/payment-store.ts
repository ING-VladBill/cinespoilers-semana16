import { create } from "zustand";

type PaymentStatus = "idle" | "processing" | "success" | "error";

interface PaymentState {
  status: PaymentStatus;
  orderId: string | null;
  errorMessage: string | null;
  processPayment: (cardNumber: string, expiry: string, cvv: string) => Promise<void>;
  reset: () => void;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  status: "idle",
  orderId: null,
  errorMessage: null,

  processPayment: async (cardNumber, expiry, cvv) => {
    set({ status: "processing", errorMessage: null });

    // Simula latencia de una pasarela real
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const cleanCard = cardNumber.replace(/\s/g, "");

    if (cleanCard.length !== 16) {
      set({ status: "error", errorMessage: "Número de tarjeta inválido." });
      return;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      set({ status: "error", errorMessage: "Fecha de expiración inválida." });
      return;
    }

    if (!/^\d{3,4}$/.test(cvv)) {
      set({ status: "error", errorMessage: "CVV inválido." });
      return;
    }

    set({
      status: "success",
      orderId: crypto.randomUUID(),
    });
  },

  reset: () => set({ status: "idle", orderId: null, errorMessage: null }),
}));
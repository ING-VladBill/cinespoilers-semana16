import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

import { useCartStore } from "@/store/cart-store";
import { usePaymentStore } from "@/store/payment-store";
import { Button } from "@/components/ui/button";
import PageContainer from "@/components/layout/page-container";

export function PurchaseSuccessPage() {
  const navigate = useNavigate();
  const { orderId, reset } = usePaymentStore();
  const clearCart = useCartStore((state) => state.clear);

  useEffect(() => {
    if (!orderId) {
      navigate("/movies");
      return;
    }

    clearCart();

    return () => reset();
  }, []);

  if (!orderId) return null;

  return (
    <PageContainer>
      <div className="my-20 flex flex-col items-center text-center">
        <CheckCircle2 className="h-16 w-16 text-green-600" />

        <h1 className="mt-4 text-2xl font-bold">¡Compra exitosa!</h1>

        <p className="mt-2 text-muted-foreground">
          Tu orden fue procesada correctamente.
        </p>

        <p className="mt-1 text-sm text-muted-foreground">
          N° de orden: <span className="font-mono">{orderId}</span>
        </p>

        <Button asChild className="mt-6">
          <Link to="/movies">Seguir explorando</Link>
        </Button>
      </div>
    </PageContainer>
  );
}
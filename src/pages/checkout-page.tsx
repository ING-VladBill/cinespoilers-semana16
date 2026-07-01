import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useCartStore } from "@/store/cart-store";
import { usePaymentStore } from "@/store/payment-store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageContainer from "@/components/layout/page-container";

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, total } = useCartStore();
  const { status, errorMessage, orderId, processPayment, reset } = usePaymentStore();

  useEffect(() => {
    if (status === "success" && orderId) {
      navigate("/checkout/success");
    }
  }, [status, orderId, navigate]);

  useEffect(() => {
    return () => {
      if (status !== "processing") reset();
    };
  }, []);

  if (items.length === 0 && status !== "success") {
    return (
      <PageContainer>
        <p className="my-16 text-center text-muted-foreground">
          No tienes películas en el carrito.
        </p>
      </PageContainer>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);

    processPayment(
      form.get("cardNumber") as string,
      form.get("expiry") as string,
      form.get("cvv") as string
    );
  };

  return (
    <PageContainer>
      <h1 className="my-8 text-3xl font-bold">Pagar</h1>

      <Card className="max-w-md">
        <CardContent className="p-6">
          <p className="mb-4 text-sm text-muted-foreground">
            Total a pagar: <strong>S/ {total().toFixed(2)}</strong>
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Número de tarjeta
              </label>
              <Input
                name="cardNumber"
                placeholder="4111 1111 1111 1111"
                required
                maxLength={19}
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="mb-1 block text-sm font-medium">
                  Expiración (MM/AA)
                </label>
                <Input name="expiry" placeholder="12/28" required maxLength={5} />
              </div>

              <div className="w-24">
                <label className="mb-1 block text-sm font-medium">CVV</label>
                <Input name="cvv" placeholder="123" required maxLength={4} />
              </div>
            </div>

            {status === "error" && errorMessage && (
              <p className="text-sm text-destructive">{errorMessage}</p>
            )}

            <Button type="submit" disabled={status === "processing"}>
              {status === "processing" ? "Procesando..." : "Pagar ahora"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
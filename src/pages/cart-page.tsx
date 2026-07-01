import { Link, useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageContainer from "@/components/layout/page-container";

const IMAGE_URL = import.meta.env.VITE_TMDB_IMAGE_URL;

export function CartPage() {
  const { items, removeItem, total } = useCartStore();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <PageContainer>
        <div className="my-16 text-center">
          <h1 className="text-2xl font-bold">Tu carrito está vacío</h1>
          <p className="mt-2 text-muted-foreground">
            Explora el catálogo y agrega alguna película.
          </p>
          <Button asChild className="mt-6">
            <Link to="/movies">Ver películas</Link>
          </Button>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <h1 className="my-8 text-3xl font-bold">Tu carrito</h1>

      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <Card key={item.movie.id}>
            <CardContent className="flex items-center gap-4 p-4">
              {item.movie.poster_path && (
                <img
                  src={`${IMAGE_URL}${item.movie.poster_path}`}
                  alt={item.movie.title}
                  className="h-24 w-16 rounded-md object-cover"
                />
              )}

              <div className="flex-1">
                <p className="font-medium">{item.movie.title}</p>
                <p className="text-sm text-muted-foreground">
                  Cantidad: {item.quantity} · S/ {(item.quantity * 9.9).toFixed(2)}
                </p>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeItem(item.movie.id)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between border-t pt-6">
        <span className="text-lg font-semibold">
          Total: S/ {total().toFixed(2)}
        </span>

        <Button onClick={() => navigate("/checkout")}>Ir a pagar</Button>
      </div>
    </PageContainer>
  );
}
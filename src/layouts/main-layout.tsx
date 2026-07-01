import { Outlet } from "react-router-dom";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
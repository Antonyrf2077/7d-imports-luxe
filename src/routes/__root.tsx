import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A página que você está procurando não existe ou foi movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-[#0D3D2A] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1A5C3E]"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Algo deu errado
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Ocorreu um erro inesperado. Tente recarregar a página ou voltar ao início.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center bg-[#0D3D2A] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1A5C3E]"
          >
            Tentar novamente
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center border border-[#0D3D2A] px-4 py-2 text-sm font-medium text-[#0D3D2A] transition-colors hover:bg-[#0D3D2A] hover:text-white"
          >
            Início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "7D IMPORTS — Curadoria de Peças Autênticas" },
      {
        name: "description",
        content:
          "A 7D Imports é curadoria cirúrgica de moda premium. Importação direta, sem intermediários, sem reposição. Peças autênticas das maiores casas de moda — Gucci, Hugo Boss, Armani e mais. Estoque exclusivo, acesso restrito.",
      },
      { name: "author", content: "7D Imports" },
      { property: "og:title", content: "7D IMPORTS — Curadoria de Peças Autênticas" },
      {
        property: "og:description",
        content:
          "Importação direta e curadoria de peças únicas das maiores grifes do mundo. Cada peça é original, etiquetada e restrita. Quando vende, não volta a ter igual.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@7dimports_" },
      { name: "twitter:title", content: "7D IMPORTS — Curadoria de Peças Autênticas" },
      {
        name: "twitter:description",
        content:
          "Importação direta e curadoria de peças únicas das maiores grifes do mundo. Cada peça é original, etiquetada e restrita.",
      },
      {
        property: "og:image",
        content: "/logo_7d_nova.png",
      },
      {
        name: "twitter:image",
        content: "/logo_7d_nova.png",
      },
      { name: "description", content: "7D Imports Luxe is a responsive SPA for ultra-luxury e-commerce, featuring agile sales logic and an immersive, high-fashion interface." },
      { property: "og:description", content: "7D Imports Luxe is a responsive SPA for ultra-luxury e-commerce, featuring agile sales logic and an immersive, high-fashion interface." },
      { name: "twitter:description", content: "7D Imports Luxe is a responsive SPA for ultra-luxury e-commerce, featuring agile sales logic and an immersive, high-fashion interface." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d0c25f3c-2e83-4d94-92c2-5ab37fa6171a/id-preview-10b35490--ae2fd675-cbe9-4c8d-b5d3-a3d6f84c6adb.lovable.app-1782303498014.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d0c25f3c-2e83-4d94-92c2-5ab37fa6171a/id-preview-10b35490--ae2fd675-cbe9-4c8d-b5d3-a3d6f84c6adb.lovable.app-1782303498014.png" },
    ],
    links: [
      {
        rel: "icon",
        type: "image/png",
        href: "/logo_7d_nova.png",
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=Montserrat:wght@400;500;600;700;900&family=Playfair+Display:ital,wght@1,700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body className="overflow-x-hidden w-full">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}

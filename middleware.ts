import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Verificação simples para testar se o erro 500 some
  // Se funcionar, o problema era nas variáveis de ambiente

  if (req.nextUrl.pathname.startsWith("/admin")) {
    const authHeader = req.headers.get("authorization");

    if (authHeader) {
      // Senha fixa para teste: user=admin, senha=admin
      // Base64 de admin:admin é YWRtaW46YWRtaW4=
      const authValue = authHeader.split(" ")[1];
      if (authValue === "YWRtaW46YWRtaW4=") {
        return NextResponse.next();
      }
    }

    return new NextResponse("Login Necessário (Teste)", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Admin Area"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};

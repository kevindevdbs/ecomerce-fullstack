import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Se não for rota de admin, passa direto e economiza processamento
  if (!req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Bloco de segurança para garantir que não crashe
  try {
    const userEnv = process.env.ADMIN_USER;
    const passEnv = process.env.ADMIN_PASSWORD;

    // Se as variáveis não existirem, bloqueia por segurança (não crasha)
    if (!userEnv || !passEnv) {
      console.error("Variáveis de ambiente de ADMIN não configuradas.");
      return new NextResponse("Erro de Configuração do Servidor", {
        status: 503,
      });
    }

    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return new NextResponse("Auth Required", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="Secure Area"' },
      });
    }

    const authValue = authHeader.split(" ")[1];
    if (!authValue) throw new Error("Header inválido");

    // Decodifica Base64 (atob funciona no Edge)
    const [user, pwd] = atob(authValue).split(":");

    if (user === userEnv && pwd === passEnv) {
      return NextResponse.next();
    }
  } catch (err) {
    console.error("Erro no middleware:", err);
  }

  // Se falhar qualquer coisa acima, nega acesso
  return new NextResponse("Acesso Negado", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Secure Area"' },
  });
}

export const config = {
  matcher: "/admin/:path*",
};

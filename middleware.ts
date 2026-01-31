import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // 1. Só roda na rota /admin
  if (pathname.startsWith("/admin")) {
    // 2. Verifica se as variáveis existem (evita crash se você esqueceu de configurar)
    const adminUser = process.env.ADMIN_USER;
    const adminPass = process.env.ADMIN_PASSWORD;

    if (!adminUser || !adminPass) {
      console.error(
        "ERRO CRÍTICO: Variáveis de ambiente ADMIN_USER ou ADMIN_PASSWORD não encontradas.",
      );
      // Retorna erro amigável em vez de tela branca
      return new NextResponse(
        "Erro de Configuração: Admin não configurado no servidor.",
        { status: 500 },
      );
    }

    // 3. Pega o cabeçalho de autenticação
    const authHeader = req.headers.get("authorization");

    // Se não tiver cabeçalho, pede senha
    if (!authHeader) {
      return new NextResponse("Autenticação Necessária", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Área Restrita"',
        },
      });
    }

    try {
      // 4. Tenta decodificar a senha (BLINDADO COM TRY/CATCH)
      const authValue = authHeader.split(" ")[1];
      if (!authValue) throw new Error("Token vazio");

      const [user, pwd] = atob(authValue).split(":");

      // 5. Confere usuário e senha
      if (user === adminUser && pwd === adminPass) {
        return NextResponse.next();
      }
    } catch (error) {
      console.error("Erro ao decodificar autenticação:", error);
      // Se der erro na decodificação, apenas nega o acesso, não derruba o site
    }

    // Se chegou aqui, a senha está errada ou falhou
    return new NextResponse("Senha Incorreta", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Área Restrita"',
      },
    });
  }

  // Deixa passar outras rotas
  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};

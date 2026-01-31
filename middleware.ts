import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Verifica se a rota acessada começa com /admin
  if (req.nextUrl.pathname.startsWith("/admin")) {
    // Busca o cabeçalho de autorização (onde o navegador manda a senha)
    const authHeader = req.headers.get("authorization");

    if (authHeader) {
      // O valor vem como "Basic base64string", precisamos decodificar
      const authValue = authHeader.split(" ")[1];
      const [user, pwd] = atob(authValue).split(":");

      // Compara com as variáveis de ambiente
      if (
        user === process.env.ADMIN_USER &&
        pwd === process.env.ADMIN_PASSWORD
      ) {
        return NextResponse.next(); // Senha certa, deixa passar
      }
    }

    // Se não tiver senha ou estiver errada, retorna erro 401 e pede a senha
    return new NextResponse("Acesso Negado", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Área Restrita do Admin"',
      },
    });
  }

  // Para qualquer outra rota (catálogo, home, sobre), deixa passar normal
  return NextResponse.next();
}

// Configura para rodar apenas nas rotas de admin
export const config = {
  matcher: "/admin/:path*",
};

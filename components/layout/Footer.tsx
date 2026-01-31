// components/layout/Footer.tsx
import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, ArrowUpRight } from "lucide-react";
// OBS: Certifique-se de ter instalado: npm install lucide-react

export default function Footer() {
  return (
    // ID para o scroll suave e scroll-margin-top para compensar o header fixo
    <footer
      id="contato-footer"
      className="scroll-mt-24 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-400 py-10 text-sm overflow-hidden relative"
    >
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-[80px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-[80px] -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-6">
        {/* --- SEÇÃO DESTAQUE --- */}
        <div className="text-center max-w-3xl mx-auto mb-10 border-b border-slate-800/50 pb-8">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
            Vamos criar algo juntos?
          </h2>
          <p className="text-slate-400 leading-relaxed px-4">
            Adoraríamos ouvir você. Tire dúvidas sobre peças, solicite
            orçamentos para encomendas personalizadas ou apenas dê um oi.
            Estamos prontos para transformar sua ideia em arte.
          </p>
        </div>

        {/* --- GRID PRINCIPAL DO FOOTER --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-start mb-10">
          {/* COLUNA 1: Sobre a Marca & Redes */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <h3 className="text-xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-pink-400 via-purple-400 to-pink-400">
                Ray Resina Art
              </h3>
            </Link>
            <p className="leading-relaxed pr-4">
              Peças de resina artesanal feitas com intenção, cor e design
              exclusivo para trazer personalidade única ao seu ambiente.
            </p>

            {/* Botão do Instagram */}
            <a
              href="https://instagram.com/seuinstagram" // COLOQUE SEU LINK AQUI
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 bg-slate-800 hover:bg-linear-to-r hover:from-pink-500 hover:to-purple-600 text-white rounded-full transition-all duration-300 group border border-slate-700 hover:border-transparent mt-2 text-xs font-semibold"
            >
              <Instagram className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span>Siga no Instagram</span>
            </a>
          </div>

          {/* COLUNA 2: Links Rápidos */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              Navegação{" "}
              <div className="h-0.5 w-6 bg-pink-500 rounded-full"></div>
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="flex items-center gap-1 group hover:text-pink-400 transition-colors w-fit"
                >
                  Início{" "}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo"
                  className="flex items-center gap-1 group hover:text-pink-400 transition-colors w-fit"
                >
                  Catálogo Completo{" "}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre"
                  className="flex items-center gap-1 group hover:text-pink-400 transition-colors w-fit"
                >
                  Sobre a Artista{" "}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUNA 3: Contatos Diretos */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              Fale Conosco{" "}
              <div className="h-0.5 w-6 bg-purple-500 rounded-full"></div>
            </h4>
            <ul className="space-y-4">
              {/* Item Email */}
              <li className="flex items-start gap-3 group">
                <div className="bg-slate-800/80 p-2 rounded-lg shrink-0 group-hover:bg-pink-500/20 transition-colors border border-slate-700 group-hover:border-pink-500/50 mt-0.5">
                  <a href="mailto:rayresinaart@gmail.com">
                    <Mail className="w-4 h-4 text-pink-400" />
                  </a>
                </div>
                <div>
                  <p className="text-white font-medium text-xs uppercase tracking-wider">
                    E-mail
                  </p>
                  <a
                    href="mailto:rayresinaart@gmail.com"
                    className="hover:text-pink-400 transition-colors break-all"
                  >
                    rayresinaart@gmail.com
                  </a>
                </div>
              </li>

              {/* Item WhatsApp */}
              <li className="flex items-start gap-3 group">
                <div className="bg-slate-800/80 p-2 rounded-lg shrink-0 group-hover:bg-green-500/20 transition-colors border border-slate-700 group-hover:border-green-500/50 mt-0.5">
                  <a
                    href="https://wa.me/5531994773257"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Phone className="w-4 h-4 text-green-400" />
                  </a>
                </div>
                <div>
                  <p className="text-white font-medium text-xs uppercase tracking-wider">
                    WhatsApp
                  </p>
                  <a
                    href="https://wa.me/5531994773257"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-400 transition-colors"
                  >
                    (31) 99477-3257
                  </a>
                  <p className="text-xs opacity-70 mt-0.5">
                    Seg a Sex, 9h às 18h
                  </p>
                </div>
              </li>

              {/* Item Localização */}
              <li className="flex items-start gap-3 opacity-80">
                <div className="bg-slate-800/80 p-2 rounded-lg shrink-0 border border-slate-700 mt-0.5">
                  <MapPin className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-white font-medium text-xs uppercase tracking-wider">
                    Ateliê
                  </p>
                  <p>
                    Ribeirão Das Neves - MG
                    <br />
                    <span className="text-xs opacity-70">
                      (Atendimento exclusivo online)
                    </span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* --- RODAPÉ INFERIOR (Copyright) --- */}
        <div className="pt-6 border-t border-slate-800/50 text-xs flex flex-col sm:flex-row justify-between items-center gap-3 opacity-70">
          <p>
            © {new Date().getFullYear()} Ray Resina. Todos os direitos
            reservados.
          </p>
          <p className="flex items-center gap-1">
            Feito com <span className="text-pink-500">❤</span> para arte
            artesanal.
          </p>
        </div>
      </div>
    </footer>
  );
}

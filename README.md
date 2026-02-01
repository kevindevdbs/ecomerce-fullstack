# E-commerce Fullstack - Ateliê

Este projeto é uma plataforma de e-commerce moderna e completa, desenvolvida para gerenciar vendas de produtos personalizados e em atacado. O sistema inclui um painel administrativo robusto, catálogo interativo e integração direta com WhatsApp para finalização de pedidos.

## 🚀 Tecnologias e Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router & Server Actions)
- **Linguagem**: TypeScript (Estrita tipagem para Senior dev experience)
- **Banco de Dados**: PostgreSQL (via SQLite em dev)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Estilização**: Tailwind CSS + Lucide Icons
- **Gerenciamento de Estado**: React Data Context (CartContext)

## ✨ Funcionalidades Principais

### Cliente (Loja Pública)

- **Catálogo Dinâmico**: Filtragem em tempo real (Fuse.js) por nome, categoria e faixa de preço.
- **Sistema de Atacado**: Preços ajustáveis automaticamente com base na quantidade selecionada (Tabela de preços progressiva).
- **Personalização**: Suporte para seleção de letras/variantes em produtos específicos.
- **Carrinho Inteligente**: Persistência de estado e cálculo automático de descontos.
- **Checkout via WhatsApp**: Geração automática de pedido formatado para envio direto.

### Painel Administrativo (/admin)

- **Dashboard CRUD**: Gestão completa de Produtos e Categorias.
- **Upload de Imagens**: Suporte para galeria de imagens adicionais por produto.
- **Gestão de Visibilidade**: Controle de exibição de itens sem necessidade de exclusão.
- **Configuração de Atacado**: Definição flexível de faixas de desconto por produto.

## 🛠️ Arquitetura e Padrões

O projeto segue padrões de engenharia de software de nível Senior:

- **Zero `any` Policy**: Todo o código é estritamente tipado usando interfaces globais em `@/types`.
- **Server Actions**: Mutação de dados segura e otimizada sem API Routes desnecessárias.
- **Atomic Design Adaptado**: Componentes organizados por domínio (`/components/product`, `/components/admin`, etc).

## 📦 Como Rodar Localmente

1. **Instale as dependências:**

```bash
npm install
```

2. **Configure o Banco de Dados:**

```bash
npx prisma generate
npx prisma migrate dev
```

3. **Inicie o Servidor:**

```bash
npm run dev
```

O projeto estará rodando em [http://localhost:3000](http://localhost:3000).

---

**Desenvolvido com foco em performance, escalabilidade e DX (Developer Experience).**

<div align="center">
  <h1>🎨 E-commerce Fullstack - Ateliê</h1>
  <p><strong>Plataforma completa de vendas online com gestão administrativa integrada</strong></p>
  
  ![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
  ![Prisma](https://img.shields.io/badge/Prisma-7.3.0-2D3748?style=for-the-badge&logo=prisma)
  ![TailwindCSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)
  ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-316192?style=for-the-badge&logo=postgresql)
  
  <br/>
  
  <a href="https://ecomerce-fullstack-hixw.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/🚀_View_Live_Demo-FF69B4?style=for-the-badge" alt="View Demo"/>
  </a>
  <a href="https://github.com/kevindevdbs/ecomerce-fullstack" target="_blank">
    <img src="https://img.shields.io/badge/⭐_Star_on_GitHub-181717?style=for-the-badge&logo=github" alt="Star on GitHub"/>
  </a>
</div>

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Demonstração](#demonstração)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Arquitetura](#arquitetura)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Database Schema](#database-schema)
- [Server Actions](#server-actions)
- [Deploy](#deploy)
- [Troubleshooting](#troubleshooting)
- [Roadmap](#roadmap)
- [Contribuindo](#contribuindo)
- [Licença](#licença)
- [Contato](#contato)

---

## 🎯 Sobre o Projeto

Este é um **e-commerce fullstack moderno** desenvolvido para ateliês e lojas que vendem produtos artesanais, personalizados e/ou em atacado. O sistema oferece uma experiência de compra fluida para clientes e um painel administrativo completo para gestão do negócio.

### ✨ Diferenciais

- **Sistema de Atacado Inteligente**: Tabelas de preços progressivas que se ajustam automaticamente baseadas na quantidade selecionada
- **Personalização de Produtos**: Suporte nativo para produtos com variações (ex: seleção de letras para chaveiros personalizados)
- **Zero-Config Checkout**: Integração direta com WhatsApp, sem necessidade de gateway de pagamento
- **Admin Dashboard Profissional**: CRUD completo com gerenciamento de visibilidade, imagens múltiplas e regras de desconto
- **Type-Safe Architecture**: 100% TypeScript com tipagem estrita (Zero `any` Policy)
- **Performance First**: Otimizações de imagem, lazy loading, e cache estratégico

---

## 🎬 Demonstração

### 🌐 Acesse o Projeto Online

**Link de Produção**: [https://ecomerce-fullstack-hixw.vercel.app/](https://ecomerce-fullstack-hixw.vercel.app/)


### Cliente (Loja Pública)

- **Home Page**: Hero section + produtos em destaque + categorias
- **Catálogo**: Busca em tempo real (Fuse.js), filtros por categoria/preço, layout responsivo
- **Página de Produto**: Galeria de imagens, detalhes técnicos, seletor de quantidade, preços de atacado
- **Carrinho**: Persistência em LocalStorage, cálculo dinâmico de descontos, geração de pedido WhatsApp

### Painel Administrativo (`/admin`)

- **Dashboard**: Listagem de produtos e categorias com ações rápidas
- **Gerenciamento de Produtos**: Formulário completo com upload de múltiplas imagens, configuração de atacado, descrições ricas
- **Gerenciamento de Categorias**: Criação e edição com controle de visibilidade
- **Controle de Visibilidade**: Ocultar produtos/categorias sem deletá-los do banco

---

## 🚀 Funcionalidades

### 🛍️ Para o Cliente

#### Navegação e Busca

- [x] Catálogo com paginação e filtros avançados
- [x] Busca fuzzy (tolerância a erros de digitação)
- [x] Filtro por faixa de preço (até R$50, R$51-150, R$151-500)
- [x] Filtro por múltiplas categorias
- [x] Layout responsivo (mobile-first)

#### Produto

- [x] Galeria de imagens com navegação por setas/touch
- [x] Descrição completa com lista de especificações
- [x] Seletor de quantidade com estoque infinito
- [x] Personalização (ex: escolha de letra)
- [x] Exibição de preços de atacado progressivos
- [x] Produtos relacionados por categoria

#### Carrinho e Checkout

- [x] Persistência de dados (LocalStorage)
- [x] Cálculo automático de desconto por atacado
- [x] Visualização de letra/variante selecionada
- [x] Ajuste de quantidade diretamente no carrinho
- [x] Geração automática de mensagem para WhatsApp
- [x] Badge de contagem de itens no header

### 👨‍💼 Para o Administrador

#### Dashboard

- [x] Visão geral de produtos e categorias
- [x] Ações rápidas (editar/deletar)
- [x] Indicadores visuais de visibilidade

#### Gestão de Produtos

- [x] Criação e edição de produtos
- [x] Upload de imagem principal + galeria adicional
- [x] Configuração de múltiplas regras de atacado
- [x] Editor de detalhes técnicos (lista)
- [x] Toggle de personalização (habilitar seleção de letra)
- [x] Controle de visibilidade (publicar/ocultar)
- [x] Associação com categorias

#### Gestão de Categorias

- [x] CRUD completo de categorias
- [x] Upload de imagem de capa
- [x] Controle de visibilidade
- [x] Contagem de produtos por categoria

#### Segurança e Validação

- [x] Validação client-side e server-side
- [x] Tratamento de erros com feedback visual
- [x] Tipagem estrita em todas as operações
- [x] Server Actions com retorno padronizado (`ActionResponse`)

---

## 🛠️ Tecnologias

### Core Stack

| Tecnologia       | Versão | Uso                                         |
| ---------------- | ------ | ------------------------------------------- |
| **Next.js**      | 16.1.6 | Framework React com SSR/SSG e App Router    |
| **TypeScript**   | 5.x    | Linguagem principal (100% type-safe)        |
| **React**        | 19.x   | Biblioteca de UI                            |
| **Prisma**       | 7.3.0  | ORM e gerenciamento de banco de dados       |
| **PostgreSQL**   | Latest | Banco de dados relacional (Vercel Postgres) |
| **Tailwind CSS** | 3.x    | Framework de estilização utilitária         |

### Bibliotecas e Ferramentas

- **Lucide React**: Ícones modernos e leves
- **Fuse.js**: Busca fuzzy de alta performance
- **clsx**: Utilitário para classes CSS condicionais
- **Next Image**: Otimização automática de imagens
- **React Context API**: Gerenciamento de estado global (Carrinho)
- **ESLint**: Linting e padronização de código
- **Prettier**: Formatação automática

### Infraestrutura

- **Vercel**: Hospedagem e CI/CD
- **Vercel Postgres**: Banco de dados gerenciado
- **Git/GitHub**: Controle de versão

---

## 🏗️ Arquitetura

### Padrões de Desenvolvimento

#### 1. **Zero `any` Policy**

Todo o código TypeScript é estritamente tipado. Interfaces globais são definidas em `/types/index.ts` e reutilizadas em toda a aplicação.

```typescript
// ❌ Evitado
const product: any = await fetchProduct();

// ✅ Padrão
const product: Product = await fetchProduct();
```

#### 2. **Server Actions First**

Mutações de dados são feitas via Server Actions do Next.js, eliminando a necessidade de API Routes customizadas.

```typescript
// app/actions/create-product.ts
export async function createProduct(
  formData: FormData,
): Promise<ActionResponse> {
  "use server";
  // Lógica de criação
}
```

#### 3. **Component-Based Architecture**

Componentes organizados por domínio funcional:

```
components/
├── admin/        # Componentes do painel administrativo
├── catalog/      # Componentes do catálogo público
├── product/      # Componentes de detalhes de produto
├── home/         # Componentes da home page
├── layout/       # Header, Footer, etc
└── ui/           # Componentes reutilizáveis (badges, buttons, etc)
```

#### 4. **Single Source of Truth**

Tipos e interfaces centralizados garantem consistência:

```typescript
// types/index.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  // ... todos os campos necessários
}
```

#### 5. **Error Handling Padronizado**

Todas as Server Actions retornam `ActionResponse`:

```typescript
export interface ActionResponse {
  success?: boolean;
  error?: string;
  data?: any;
}
```

---

## 📥 Instalação

### Pré-requisitos

- **Node.js**: >= 18.x
- **npm** ou **yarn**: Latest
- **PostgreSQL**: 14+ (ou usar Vercel Postgres)
- **Git**: Para clonar o repositório

### Passo a Passo

#### 1. Clone o Repositório

```bash
git clone https://github.com/kevindevdbs/ecomerce-fullstack.git
cd ecomerce-fullstack
```

#### 2. Instale as Dependências

```bash
npm install
```

Isso irá instalar todas as dependências e executar automaticamente o `prisma generate` via script `postinstall`.

#### 3. Configure as Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
cp .env.example .env
```

Edite o `.env` com suas credenciais:

```env
# Database
DATABASE_URL="postgresql://usuario:senha@localhost:5432/ecommerce_db"
POSTGRES_PRISMA_URL="postgresql://usuario:senha@localhost:5432/ecommerce_db"
POSTGRES_URL_NON_POOLING="postgresql://usuario:senha@localhost:5432/ecommerce_db"

# WhatsApp (opcional, para checkout)
NEXT_PUBLIC_WHATSAPP_NUMBER="5531994773257"

# Next.js
NODE_ENV="development"
```

#### 4. Configure o Banco de Dados

Execute as migrations do Prisma:

```bash
npx prisma migrate dev
```

Isso criará todas as tabelas necessárias no banco de dados.

#### 5. (Opcional) Popule o Banco com Dados de Teste

```bash
npx prisma db seed
```

> **Nota**: Você precisará criar um arquivo `prisma/seed.ts` para isso.

#### 6. Inicie o Servidor de Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

---

## ⚙️ Configuração

### Variáveis de Ambiente

| Variável                      | Descrição                            | Exemplo                                    |
| ----------------------------- | ------------------------------------ | ------------------------------------------ |
| `DATABASE_URL`                | URL de conexão principal do Postgres | `postgresql://user:pass@localhost:5432/db` |
| `POSTGRES_PRISMA_URL`         | URL usada pelo Prisma Client         | Mesma que `DATABASE_URL`                   |
| `POSTGRES_URL_NON_POOLING`    | URL sem pooling (para migrations)    | Mesma que `DATABASE_URL`                   |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número do WhatsApp para checkout     | `5531999999999`                            |
| `NODE_ENV`                    | Ambiente de execução                 | `development` ou `production`              |

### Configuração do Prisma

O projeto usa um arquivo de configuração customizado:

```typescript
// prisma.config.ts
import { defineConfig } from "prisma/config";

export default defineConfig({
  // Configurações personalizadas
});
```

### Configuração do Tailwind

Classes customizadas e temas estão em:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        pink: {
          /* paleta customizada */
        },
        purple: {
          /* paleta customizada */
        },
      },
    },
  },
};
```

---

## 💻 Uso

### Acessando o Painel Administrativo

1. Navegue para [http://localhost:3000/admin](http://localhost:3000/admin)
2. Você verá a lista de produtos e categorias

### Criando um Produto

1. Clique em **"Novo Produto"**
2. Preencha os campos obrigatórios:
   - Nome do Produto
   - Preço Base
   - Categoria
   - Imagem Principal
   - Descrição Curta
   - Descrição Completa
3. (Opcional) Adicione imagens à galeria
4. (Opcional) Configure regras de atacado:
   - Quantidade Mínima: 10
   - Preço Unitário: R$ 8,00
5. (Opcional) Habilite a personalização de letra
6. Marque como "Visível" para publicar
7. Clique em **"Salvar Produto"**

### Criando uma Categoria

1. Vá para **Admin → Categorias → Nova Categoria**
2. Adicione um nome (ex: "Chaveiros")
3. Faça upload da imagem de capa
4. Marque como "Visível"
5. Salve

### Fluxo de Compra do Cliente

1. Cliente navega pelo catálogo
2. Usa filtros para encontrar produtos
3. Clica em um produto para ver detalhes
4. Seleciona quantidade (preço de atacado aparece automaticamente)
5. Seleciona letra (se disponível)
6. Clica em "Adicionar ao Carrinho"
7. Acessa o carrinho no ícone do header
8. Revisa os itens
9. Clica em "Finalizar no WhatsApp"
10. É redirecionado para WhatsApp com pedido formatado

---

## 📂 Estrutura de Pastas

```
ecomerce-fullstack/
├── app/                          # Next.js App Router
│   ├── actions/                  # Server Actions
│   │   ├── category.ts           # CRUD de categorias
│   │   ├── create-product.ts     # Criar produto
│   │   ├── update-product.ts     # Atualizar produto
│   │   └── delete-product.ts     # Deletar produto
│   ├── admin/                    # Rotas administrativas
│   │   ├── page.tsx              # Dashboard principal
│   │   ├── categorias/           # Gestão de categorias
│   │   ├── novo-produto/         # Criar produto
│   │   └── editar-produto/[id]/  # Editar produto
│   ├── catalogo/                 # Catálogo público
│   │   └── page.tsx              # Listagem de produtos
│   ├── produto/[id]/             # Detalhes do produto
│   │   └── page.tsx
│   ├── sobre/                    # Página sobre
│   ├── layout.tsx                # Layout global
│   ├── page.tsx                  # Home page
│   └── globals.css               # Estilos globais
│
├── components/                   # Componentes React
│   ├── admin/                    # Componentes do admin
│   │   ├── CategoryForm.tsx
│   │   ├── ProductForm.tsx
│   │   ├── ImageUpload.tsx
│   │   └── DeleteButtons.tsx
│   ├── catalog/                  # Componentes do catálogo
│   │   ├── CatalogClient.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── SearchInput.tsx
│   │   └── Filters.tsx
│   ├── product/                  # Componentes de produto
│   │   ├── ProductCard.tsx
│   │   ├── ProductGallery.tsx
│   │   ├── ProductInfo.tsx
│   │   ├── ProductActions.tsx
│   │   └── RelatedProducts.tsx
│   ├── home/                     # Componentes da home
│   │   ├── HeroSection.tsx
│   │   ├── FeaturedProducts.tsx
│   │   └── CategoryGrid.tsx
│   ├── layout/                   # Layout components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── ui/                       # UI reutilizável
│       ├── Badge.tsx
│       └── SectionTitle.tsx
│
├── context/                      # React Context
│   ├── CartContext.tsx           # Gerenciamento do carrinho
│   └── CartDrawer.tsx            # UI do carrinho
│
├── hooks/                        # Custom Hooks
│   └── useProductFilter.ts       # Lógica de filtros
│
├── lib/                          # Utilitários
│   └── prisma.ts                 # Instância do Prisma Client
│
├── prisma/                       # Database
│   ├── schema.prisma             # Definição do schema
│   ├── migrations/               # Histórico de migrations
│   └── prisma.config.ts          # Configuração do Prisma
│
├── types/                        # TypeScript Types
│   └── index.ts                  # Interfaces globais
│
├── public/                       # Arquivos estáticos
│   └── images/                   # Imagens do projeto
│
├── .env                          # Variáveis de ambiente
├── .env.example                  # Template de .env
├── .eslintrc.json                # Configuração ESLint
├── .gitignore                    # Arquivos ignorados pelo Git
├── middleware.ts                 # Next.js Middleware
├── next.config.ts                # Configuração do Next.js
├── package.json                  # Dependências e scripts
├── postcss.config.mjs            # Configuração PostCSS
├── tailwind.config.ts            # Configuração Tailwind
├── tsconfig.json                 # Configuração TypeScript
└── README.md                     # Este arquivo
```

---

## 🗄️ Database Schema

### Modelos Principais

#### **Product**

```prisma
model Product {
  id                  Int                @id @default(autoincrement())
  name                String
  price               Float
  image               String?
  additionalImages    String[]
  categoryId          Int
  category            Category           @relation(fields: [categoryId], references: [id])
  shortDescription    String
  fullDescription     String
  details             String[]
  isVisible           Boolean            @default(true)
  hasLetterSelection  Boolean?           @default(false)
  wholesaleOptions    WholesaleOption[]
}
```

#### **Category**

```prisma
model Category {
  id        Int       @id @default(autoincrement())
  name      String
  image     String?
  isVisible Boolean   @default(true)
  products  Product[]
}
```

#### **WholesaleOption**

```prisma
model WholesaleOption {
  id          Int      @id @default(autoincrement())
  productId   Int
  product     Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  minQuantity Int
  unitPrice   Float
}
```

### Relacionamentos

- **Product ↔ Category**: Muitos para Um (Many-to-One)
- **Product ↔ WholesaleOption**: Um para Muitos (One-to-Many) com Cascade Delete

---

## 🔧 Server Actions

### Produtos

#### `createProduct(formData, additionalImages, wholesale)`

Cria um novo produto no banco de dados.

**Parâmetros:**

- `formData: FormData` - Dados do formulário
- `additionalImages: string[]` - URLs das imagens adicionais
- `wholesale: WholesaleOption[]` - Regras de atacado

**Retorno:**

```typescript
{
  success?: boolean;
  error?: string;
}
```

#### `updateProduct(id, formData, additionalImages, wholesale)`

Atualiza um produto existente.

#### `deleteProduct(productId)`

Deleta um produto e suas relações (cascade).

### Categorias

#### `createCategory(formData)`

Cria uma nova categoria.

#### `updateCategory(id, formData)`

Atualiza uma categoria existente.

#### `deleteCategory(id)`

Deleta uma categoria (apenas se não tiver produtos associados).

---

## 🚀 Deploy

### 🌍 Projeto em Produção

Este projeto já está **live** e pode ser acessado em:  
**[https://ecomerce-fullstack-hixw.vercel.app/](https://ecomerce-fullstack-hixw.vercel.app/)**

---

### Deploy na Vercel (Recomendado)

#### 1. Configuração Inicial

```bash
# Instale a Vercel CLI
npm i -g vercel

# Faça login
vercel login
```

#### 2. Conecte ao Vercel Postgres

1. No dashboard da Vercel, crie um novo projeto
2. Vá em **Storage → Create Database**
3. Selecione **Postgres**
4. Copie as variáveis de ambiente geradas

#### 3. Configure as Variáveis no Vercel

No painel do projeto:

- **Settings → Environment Variables**
- Adicione todas as variáveis do `.env`:
  - `DATABASE_URL`
  - `POSTGRES_PRISMA_URL`
  - `POSTGRES_URL_NON_POOLING`
  - `NEXT_PUBLIC_WHATSAPP_NUMBER`

#### 4. Execute as Migrations

```bash
# Localmente, com URL de produção
DATABASE_URL="sua-url-de-producao" npx prisma migrate deploy
```

#### 5. Deploy

```bash
vercel --prod
```

### Scripts Importantes

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && next build",
    "start": "next start",
    "lint": "next lint",
    "postinstall": "prisma generate"
  }
}
```

---

## 🐛 Troubleshooting

### Erro: "Cannot find module '@prisma/client'"

**Solução:**

```bash
npx prisma generate
```

### Erro: "PrismaClientInitializationError"

**Causa**: Variável `DATABASE_URL` incorreta ou banco não acessível.

**Solução:**

1. Verifique o `.env`
2. Teste a conexão: `npx prisma db pull`

### Erro de Build: "Type 'any' is not assignable..."

**Causa**: Violação da política Zero `any`.

**Solução:**

1. Verifique o arquivo apontado no erro
2. Adicione tipos explícitos usando interfaces de `@/types`

### Imagens Não Carregam

**Causa**: URLs inválidas ou Next.js Image não configurado para domínios externos.

**Solução:**
Adicione domínios permitidos em `next.config.ts`:

```typescript
module.exports = {
  images: {
    domains: ["seudominio.com", "cloudinary.com"],
  },
};
```

### Carrinho Não Persiste

**Causa**: LocalStorage bloqueado ou erro de parsing.

**Solução:**

1. Limpe o LocalStorage: `localStorage.clear()`
2. Verifique o console do navegador

---

## 🗺️ Roadmap

### Versão 1.1 (Curto Prazo)

- [ ] Sistema de autenticação (Admin login)
- [ ] Dashboard com métricas (vendas, produtos mais vendidos)
- [ ] Exportação de pedidos (CSV/PDF)
- [ ] Notificações por e-mail (novos pedidos)
- [ ] Sistema de cupons de desconto

### Versão 2.0 (Médio Prazo)

- [ ] Integração com gateway de pagamento (Stripe/Mercado Pago)
- [ ] Sistema de avaliações e comentários
- [ ] Wishlist (lista de desejos)
- [ ] Histórico de pedidos do cliente
- [ ] Comparação de produtos

### Versão 3.0 (Longo Prazo)

- [ ] PWA (Progressive Web App)
- [ ] App mobile (React Native)
- [ ] Sistema de afiliados
- [ ] Marketplace multi-vendedor
- [ ] IA para recomendações de produtos

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga os passos:

### 1. Fork o Projeto

Clique em **Fork** no GitHub.

### 2. Crie uma Branch

```bash
git checkout -b feature/MinhaNovaFeature
```

### 3. Commit suas Mudanças

```bash
git commit -m 'feat: Adiciona nova funcionalidade X'
```

**Padrão de Commits:**

- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `style:` - Formatação
- `refactor:` - Refatoração de código
- `test:` - Testes
- `chore:` - Manutenção

### 4. Push para a Branch

```bash
git push origin feature/MinhaNovaFeature
```

### 5. Abra um Pull Request

Descreva suas mudanças detalhadamente.

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 📧 Contato

**Kevin Dias**  
📧 Email: kevindevdbs@gmail.com  
🔗 GitHub: [@kevindevdbs](https://github.com/kevindevdbs)  
💼 LinkedIn: [Kevin Dias](https://linkedin.com/in/kevindevdbs)  
🌐 Projeto Live: [https://ecomerce-fullstack-hixw.vercel.app/](https://ecomerce-fullstack-hixw.vercel.app/)

---

<div align="center">
  <p>Desenvolvido com ❤️ por <strong>Kevin Dias</strong></p>
  <p><i>Feito com Next.js, TypeScript, Prisma e muito café ☕</i></p>
  
  ⭐ **Se este projeto te ajudou, considere dar uma estrela!** ⭐
</div>

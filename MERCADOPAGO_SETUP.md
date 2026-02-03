# 💳 Integração Mercado Pago - Guia de Configuração

## 📋 O que foi implementado

✅ SDK do Mercado Pago instalado
✅ Rota API `/api/checkout` para criar preferências de pagamento
✅ Botão "Pagar com Mercado Pago" no carrinho
✅ Páginas de retorno (sucesso, falha, pendente)
✅ Webhook para receber notificações (opcional)

---

## 🔧 Configuração Passo a Passo

### 1. Obter Credenciais do Mercado Pago

1. Acesse: https://www.mercadopago.com.br/developers
2. Faça login na sua conta Mercado Pago
3. Vá em **"Suas integrações"** → **"Criar aplicação"**
4. Copie suas credenciais:
   - **Access Token** (Token de acesso)
   - **Public Key** (Chave pública)

> 💡 **Importante**: Existem credenciais de **teste** e **produção**. Use as de teste primeiro!

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto (se não existir) e adicione:

```env
# Mercado Pago
MERCADOPAGO_ACCESS_TOKEN="APP_USR-XXXXXXXX-XXXXXX-XXXXXX-XXXXXXXXX"
MERCADOPAGO_PUBLIC_KEY="APP_USR-XXXXXXXX-XXXXXX-XXXXXX-XXXXXXXXX"

# URL Base (altere para seu domínio em produção)
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

### 3. Testar em Modo Sandbox

1. Use as **credenciais de teste** do Mercado Pago
2. Ao clicar em "Pagar com Mercado Pago", você será redirecionado para a página de checkout
3. Use os cartões de teste fornecidos pelo Mercado Pago:

#### Cartões de Teste

**Aprovado:**

- Número: `5031 4332 1540 6351`
- CVV: `123`
- Validade: Qualquer data futura

**Rejeitado:**

- Número: `5031 4935 1642 8961`
- CVV: `123`
- Validade: Qualquer data futura

[Lista completa de cartões de teste](https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/additional-content/test-cards)

---

## 🚀 Como Funciona

### Fluxo de Pagamento

1. **Usuário adiciona produtos ao carrinho**
2. **Clica em "Pagar com Mercado Pago"**
3. **Sistema cria preferência de pagamento** (rota `/api/checkout`)
4. **Usuário é redirecionado** para checkout do Mercado Pago
5. **Após pagamento**, usuário retorna para:
   - `/pagamento/sucesso` - Pagamento aprovado
   - `/pagamento/falha` - Pagamento rejeitado
   - `/pagamento/pendente` - Pagamento em análise

### Webhook (Opcional)

O webhook em `/api/webhook` recebe notificações automáticas do Mercado Pago sobre mudanças no status do pagamento.

**Para configurar em produção:**

1. Acesse o painel do Mercado Pago
2. Vá em **"Webhooks"**
3. Adicione a URL: `https://seudominio.com/api/webhook`
4. Selecione os eventos: `payment`, `merchant_order`

---

## 📝 Próximos Passos Recomendados

### 1. Implementar Sistema de Pedidos

Crie um modelo `Order` no Prisma para salvar os pedidos:

```prisma
model Order {
  id              String   @id @default(cuid())
  paymentId       String   @unique
  status          String   // pending, approved, rejected
  items           Json     // Array com os produtos
  total           Float
  customerEmail   String?
  customerName    String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

### 2. Integrar com Webhook

No webhook, salve/atualize o pedido no banco:

```typescript
// app/api/webhook/route.ts
if (type === "payment") {
  const payment = await getPaymentDetails(data.id);

  await prisma.order.upsert({
    where: { paymentId: payment.id },
    update: { status: payment.status },
    create: {
      paymentId: payment.id,
      status: payment.status,
      items: payment.additional_info.items,
      total: payment.transaction_amount,
      customerEmail: payment.payer.email,
    },
  });
}
```

### 3. Adicionar Notificações por E-mail

Use um serviço como **Resend**, **SendGrid** ou **Nodemailer** para enviar e-mails de confirmação.

### 4. Painel Administrativo

Crie uma página em `/admin/pedidos` para visualizar e gerenciar pedidos.

---

## 🔒 Segurança

### Em Produção:

1. ✅ Sempre use HTTPS
2. ✅ Valide o webhook com a assinatura do Mercado Pago
3. ✅ Nunca exponha suas credenciais no código
4. ✅ Use variáveis de ambiente
5. ✅ Implemente rate limiting na API

---

## 🐛 Troubleshooting

### Erro: "Access Token inválido"

- Verifique se copiou o token corretamente
- Confirme se está usando o token de **teste** ou **produção** adequado
- Não adicione espaços extras no `.env`

### Checkout não abre

- Verifique o console do navegador
- Confirme que a rota `/api/checkout` está respondendo
- Teste a URL diretamente: `http://localhost:3000/api/checkout`

### Webhook não funciona em desenvolvimento

- Use **ngrok** ou **localtunnel** para expor seu localhost
- Configure a URL pública no painel do Mercado Pago

---

## 📚 Recursos Úteis

- [Documentação Mercado Pago](https://www.mercadopago.com.br/developers)
- [SDK Node.js](https://github.com/mercadopago/sdk-nodejs)
- [Cartões de Teste](https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/additional-content/test-cards)
- [Referência da API](https://www.mercadopago.com.br/developers/pt/reference)

---

## 💡 Dicas

- Comece sempre com as **credenciais de teste**
- Teste todos os cenários (aprovado, rejeitado, pendente)
- Implemente logs para debug
- Monitore o webhook em produção
- Mantenha backup dos pedidos

---

**Desenvolvido para:** E-commerce Fullstack
**Data:** Fevereiro 2026

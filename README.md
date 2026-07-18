# Protex — colocar no ar de graça, com pagamento de verdade

Siga esta ordem. É tudo clique e colar, sem precisar programar.

## 1. Criar sua conta no Mercado Pago (gratuito)

1. Acesse https://www.mercadopago.com.br e crie uma conta (ou use a que você já tem).
2. Entre em **mercadopago.com.br/developers/panel** → **Suas integrações** → **Criar aplicação**.
3. Dê um nome qualquer (ex: "Protex") e confirme.
4. Vá em **Credenciais de teste** primeiro — copie o **Access Token de teste**. Guarde essa string, você vai usar já já.
   - Isso deixa o site funcionando em modo simulação (nenhum dinheiro real é cobrado) até você confirmar que tudo funciona.
   - Depois, quando quiser receber pagamentos de verdade, é só trocar pelo **Access Token de produção** (mesma tela).

## 2. Colocar o código no GitHub (gratuito)

1. Crie uma conta em https://github.com se ainda não tiver.
2. Clique em **New repository**, dê um nome (ex: `protex-site`), deixe **Public** ou **Private**, e clique em **Create repository**.
3. Na tela seguinte, clique em **uploading an existing file** e arraste TODOS os arquivos desta pasta (`index.html`, a pasta `api`, `package.json`, `sucesso.html`, `falha.html`, `pendente.html`).
4. Clique em **Commit changes**.

## 3. Publicar de graça na Vercel

1. Crie uma conta em https://vercel.com usando "Continue with GitHub" (assim ela já enxerga seus repositórios).
2. Clique em **Add New → Project**.
3. Selecione o repositório `protex-site` que você acabou de criar.
4. Antes de clicar em Deploy, abra **Environment Variables** e adicione duas:
   - `MP_ACCESS_TOKEN` → cole o Access Token de teste do passo 1
   - `SITE_URL` → deixe em branco por enquanto (você vai preencher depois que a Vercel gerar a URL — veja passo 5)
5. Clique em **Deploy**. Em menos de 1 minuto a Vercel te entrega uma URL pública, tipo `https://protex-site.vercel.app` — **isso já é seu site no ar, de graça**.
6. Volte em **Settings → Environment Variables**, edite `SITE_URL` colocando essa URL que você recebeu, e clique em **Redeploy** (aba Deployments → ⋯ → Redeploy) para aplicar.

## 4. Testar o pagamento

1. Acesse sua URL da Vercel, abra o site, vá até "Enviar um caso agora" e siga o fluxo até "Confirmar pedido".
2. Você será redirecionado para uma tela real do Mercado Pago (modo teste). Use um cartão de teste deles — a lista oficial está em:
   https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/additional-content/test-cards
3. Se aprovar, você cai na página `sucesso.html`. Se recusar, cai em `falha.html`.

## 5. Ir para produção (dinheiro de verdade)

1. No painel do Mercado Pago, copie o **Access Token de produção**.
2. Na Vercel, troque o valor de `MP_ACCESS_TOKEN` por esse token de produção.
3. Redeploy (mesmo passo do item 3.6).
4. Pronto — o site aceita pagamentos reais (Pix, cartão, boleto), sem mensalidade nenhuma. O Mercado Pago só desconta uma % de cada venda aprovada.

## Sobre o custo

- **Vercel (hospedagem):** grátis no plano Hobby, suficiente pra esse estágio.
- **GitHub:** grátis.
- **Mercado Pago:** sem mensalidade, sem taxa fixa — só desconta uma porcentagem por transação aprovada (a taxa exata aparece no painel deles, varia por método de pagamento).

## O que este pacote NÃO faz ainda (próximos passos)

- Não tem banco de dados — pedidos e cadastros de laboratório não ficam salvos entre sessões.
- Não envia e-mail/WhatsApp automático de confirmação.
- O chat e o painel de admin ainda são simulações no front-end.

Quando quiser, dá pra evoluir isso com um banco de dados gratuito (ex: Supabase) para os pedidos e logins passarem a ser reais.

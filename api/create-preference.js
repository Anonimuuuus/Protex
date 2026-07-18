// Esta função roda no servidor (Vercel), nunca no navegador.
// Por isso o Access Token do Mercado Pago fica seguro, em variável de ambiente.
const mercadopago = require('mercadopago');

module.exports = async (req, res) => {
  // Libera chamadas vindas do seu site (ajuste depois para o domínio final, se quiser mais segurança)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  mercadopago.configure({
    access_token: process.env.MP_ACCESS_TOKEN
  });

  const { title, price, quantity } = req.body || {};
  const siteUrl = process.env.SITE_URL || 'http://localhost:3000';

  try {
    const preference = {
      items: [
        {
          title: title || 'Pedido Protex',
          unit_price: Number(price) > 0 ? Number(price) : 100,
          quantity: Number(quantity) > 0 ? Number(quantity) : 1,
          currency_id: 'BRL'
        }
      ],
      back_urls: {
        success: `${siteUrl}/sucesso.html`,
        failure: `${siteUrl}/falha.html`,
        pending: `${siteUrl}/pendente.html`
      },
      auto_return: 'approved'
    };

    const response = await mercadopago.preferences.create(preference);

    return res.status(200).json({
      id: response.body.id,
      init_point: response.body.init_point,          // link de pagamento em produção
      sandbox_init_point: response.body.sandbox_init_point // link de pagamento em modo teste
    });
  } catch (error) {
    console.error('Erro Mercado Pago:', error);
    return res.status(500).json({ error: 'Erro ao criar preferência de pagamento' });
  }
};

// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  try {
    const { orderNumber, customerEmail, customerName, total, items } = await req.json()

    // Crear el HTML del email
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #f9fafb;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .order-number {
              background: white;
              padding: 15px;
              border-radius: 8px;
              font-size: 20px;
              font-weight: bold;
              color: #dc2626;
              text-align: center;
              margin: 20px 0;
            }
            .items-table {
              width: 100%;
              background: white;
              border-radius: 8px;
              overflow: hidden;
              margin: 20px 0;
            }
            .items-table th {
              background: #f3f4f6;
              padding: 12px;
              text-align: left;
              font-weight: bold;
            }
            .items-table td {
              padding: 12px;
              border-top: 1px solid #e5e7eb;
            }
            .total {
              background: white;
              padding: 20px;
              border-radius: 8px;
              margin-top: 20px;
            }
            .total-row {
              display: flex;
              justify-content: space-between;
              padding: 10px 0;
              font-size: 18px;
              font-weight: bold;
              color: #dc2626;
              border-top: 2px solid #e5e7eb;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              color: #6b7280;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 32px;">AVÍCOLA LAS PALMAS</h1>
              <p style="margin: 10px 0 0 0; font-size: 16px;">¡Gracias por tu pedido!</p>
            </div>

            <div class="content">
              <h2>¡Hola ${customerName}!</h2>
              <p>Hemos recibido tu pedido correctamente. A continuación encontrarás los detalles:</p>

              <div class="order-number">
                Número de Orden: ${orderNumber}
              </div>

              <table class="items-table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  ${items.map((item: any) => `
                    <tr>
                      <td>${item.name}</td>
                      <td>${item.quantity}</td>
                      <td>$${item.total.toLocaleString('es-CO')}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>

              <div class="total">
                <div class="total-row">
                  <span>Total:</span>
                  <span>$${total.toLocaleString('es-CO')}</span>
                </div>
              </div>

              <p style="margin-top: 30px;">
                <strong>¿Qué sigue?</strong>
              </p>
              <p>
                Nuestro equipo procesará tu pedido y nos pondremos en contacto contigo para coordinar la entrega.
              </p>

              <p style="margin-top: 20px;">
                Puedes revisar el estado de tu pedido en cualquier momento desde tu
                <a href="https://tudominio.com/dashboard" style="color: #dc2626; font-weight: bold;">panel de control</a>.
              </p>
            </div>

            <div class="footer">
              <p>AVÍCOLA LAS PALMAS</p>
              <p>Huevos frescos de la mejor calidad</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Enviar email usando Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Avícola Las Palmas <pedidos@avicolalaspalmas.com>',
        to: [customerEmail],
        subject: `Confirmación de Pedido ${orderNumber} - Avícola Las Palmas`,
        html: emailHtml,
      }),
    })

    const data = await res.json()

    return new Response(
      JSON.stringify(data),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 200
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500
      },
    )
  }
})

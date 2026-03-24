import express from "express";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import path from "path";
import { MercadoPagoConfig, Payment } from "mercadopago";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Initialize Mercado Pago
  const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || "",
    options: { timeout: 5000 }
  });

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Create a Pix payment
  app.post("/api/pix/create", async (req, res) => {
    try {
      const { amount, description, email, firstName, lastName, cpf } = req.body;

      if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
        return res.status(500).json({ error: "Mercado Pago token not configured" });
      }

      const payment = new Payment(client);
      const idempotencyKey = Math.random().toString(36).substring(2) + Date.now().toString(36);
      const result = await payment.create({
        body: {
          transaction_amount: Number(amount),
          description: description || "Depósito Kactus Bank",
          payment_method_id: "pix",
          payer: {
            email: email || "test@test.com",
            first_name: firstName || "Test",
            last_name: lastName || "User",
            identification: {
              type: "CPF",
              number: cpf || "19119119100"
            }
          }
        },
        requestOptions: { idempotencyKey }
      });

      res.json({
        id: result.id,
        status: result.status,
        qr_code: result.point_of_interaction?.transaction_data?.qr_code,
        qr_code_base64: result.point_of_interaction?.transaction_data?.qr_code_base64
      });
    } catch (error) {
      console.error("Error creating Pix payment:", error);
      res.status(500).json({ error: "Failed to create Pix payment" });
    }
  });

  // Check payment status
  app.get("/api/pix/status/:id", async (req, res) => {
    try {
      const { id } = req.params;

      if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
        return res.status(500).json({ error: "Mercado Pago token not configured" });
      }

      const payment = new Payment(client);
      const result = await payment.get({ id: id });

      res.json({
        id: result.id,
        status: result.status
      });
    } catch (error) {
      console.error("Error checking payment status:", error);
      res.status(500).json({ error: "Failed to check payment status" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

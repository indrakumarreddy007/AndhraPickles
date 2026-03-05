import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getDb } from "../lib/db";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") return res.status(204).end();
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed." });

    try {
        const { email } = req.body ?? {};
        if (!email || typeof email !== "string" || !email.includes("@")) {
            return res.status(400).json({ error: "A valid email address is required." });
        }

        const normalised = email.trim().toLowerCase();
        const sql = getDb();

        if (!sql) {
            // DB not configured — still acknowledge gracefully
            return res.status(201).json({
                message: "Welcome to the Spice Club! 🌶️ Check your inbox for 15% off.",
            });
        }

        const [subscriber] = await sql`
      INSERT INTO newsletter_subscribers (email)
      VALUES (${normalised})
      ON CONFLICT (email) DO NOTHING
      RETURNING id, email, created_at
    `;

        if (!subscriber) {
            return res.status(200).json({ message: "You are already subscribed!" });
        }

        return res.status(201).json({
            message: "Welcome to the Spice Club! 🌶️ Check your inbox for 15% off.",
            subscriber,
        });
    } catch (err) {
        console.error("[api/newsletter]", err);
        return res.status(500).json({ error: "Internal server error." });
    }
}

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "../../lib/db";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(204).end();
    }

    try {
        // ------------------------------------------------------------------ GET
        if (req.method === "GET") {
            const products = await sql`
        SELECT id, name, price, image, "spiceLevel", tag
        FROM products
        ORDER BY id ASC
      `;
            return res.status(200).json(products);
        }

        // ----------------------------------------------------------------- POST
        if (req.method === "POST") {
            const { name, price, image, spiceLevel, tag } = req.body ?? {};

            if (!name || !price || !image || spiceLevel == null || !tag) {
                return res.status(400).json({ error: "All fields are required." });
            }

            const level = parseInt(spiceLevel, 10);
            if (isNaN(level) || level < 1 || level > 3) {
                return res.status(400).json({ error: "spiceLevel must be 1, 2, or 3." });
            }

            const [product] = await sql`
        INSERT INTO products (name, price, image, "spiceLevel", tag)
        VALUES (${name}, ${price}, ${image}, ${level}, ${tag})
        RETURNING id, name, price, image, "spiceLevel", tag
      `;
            return res.status(201).json(product);
        }

        return res.status(405).json({ error: "Method not allowed." });
    } catch (err) {
        console.error("[api/products]", err);
        return res.status(500).json({ error: "Internal server error." });
    }
}

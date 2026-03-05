import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getDb } from "../../lib/db";

const FALLBACK_PRODUCTS = [
    { id: 1, name: "Chicken Pickle", price: "$18.99", image: "/images/chicken_pickle.png", spiceLevel: 3, tag: "Non-Veg Special" },
    { id: 2, name: "Avakaya Pickle", price: "$12.99", image: "/images/avakaya_pickle.png", spiceLevel: 3, tag: "Best Seller" },
    { id: 3, name: "Tamoto Pickle", price: "$10.99", image: "/images/tamoto_pickle.png", spiceLevel: 2, tag: "Daily Delight" },
    { id: 4, name: "Lemon Pickle", price: "$9.99", image: "/images/lemon_pickle.png", spiceLevel: 2, tag: "Tangy" },
    { id: 5, name: "Amla Pickle", price: "$11.50", image: "/images/amla_pickle.png", spiceLevel: 1, tag: "Healthy Choice" },
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") return res.status(204).end();

    const sql = getDb();

    try {
        // ── GET ──────────────────────────────────────────────────────────
        if (req.method === "GET") {
            if (!sql) {
                return res.status(200).json(FALLBACK_PRODUCTS);
            }
            const products = await sql`
        SELECT id, name, price, image, "spiceLevel", tag
        FROM products ORDER BY id ASC
      `;
            return res.status(200).json(products.length > 0 ? products : FALLBACK_PRODUCTS);
        }

        // ── POST ─────────────────────────────────────────────────────────
        if (req.method === "POST") {
            const { name, price, image, spiceLevel, tag } = req.body ?? {};
            if (!name || !price || !image || spiceLevel == null || !tag) {
                return res.status(400).json({ error: "All fields are required." });
            }
            const level = parseInt(spiceLevel, 10);
            if (isNaN(level) || level < 1 || level > 3) {
                return res.status(400).json({ error: "spiceLevel must be 1, 2, or 3." });
            }
            if (!sql) return res.status(503).json({ error: "Database not configured." });

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
        if (req.method === "GET") return res.status(200).json(FALLBACK_PRODUCTS);
        return res.status(500).json({ error: "Internal server error." });
    }
}

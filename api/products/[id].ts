import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "../../lib/db";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(204).end();
    }

    const id = Number(req.query.id);
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: "Invalid product id." });
    }

    try {
        // ------------------------------------------------------------------ GET
        if (req.method === "GET") {
            const [product] = await sql`
        SELECT id, name, price, image, "spiceLevel", tag
        FROM products
        WHERE id = ${id}
      `;
            if (!product) return res.status(404).json({ error: "Product not found." });
            return res.status(200).json(product);
        }

        // ------------------------------------------------------------------ PUT
        if (req.method === "PUT") {
            const { name, price, image, spiceLevel, tag } = req.body ?? {};

            if (!name || !price || !image || spiceLevel == null || !tag) {
                return res.status(400).json({ error: "All fields are required." });
            }

            const level = parseInt(spiceLevel, 10);
            if (isNaN(level) || level < 1 || level > 3) {
                return res.status(400).json({ error: "spiceLevel must be 1, 2, or 3." });
            }

            const [updated] = await sql`
        UPDATE products
        SET name = ${name},
            price = ${price},
            image = ${image},
            "spiceLevel" = ${level},
            tag = ${tag}
        WHERE id = ${id}
        RETURNING id, name, price, image, "spiceLevel", tag
      `;
            if (!updated) return res.status(404).json({ error: "Product not found." });
            return res.status(200).json(updated);
        }

        // --------------------------------------------------------------- DELETE
        if (req.method === "DELETE") {
            const result = await sql`
        DELETE FROM products WHERE id = ${id} RETURNING id
      `;
            if (result.length === 0) {
                return res.status(404).json({ error: "Product not found." });
            }
            return res.status(200).json({ success: true, id });
        }

        return res.status(405).json({ error: "Method not allowed." });
    } catch (err) {
        console.error(`[api/products/${id}]`, err);
        return res.status(500).json({ error: "Internal server error." });
    }
}

import connection from "../database.js";

export async function getCategories(_req, res) {
    try {
        const resultCategories = await connection.query("SELECT * FROM categories");
        if (!resultCategories) res.status(400).send("Bad request")

        res.send(resultCategories.rows);
        
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

export async function postCategories(req, res) {
    const { newCategory } = req.body;

    try {
        await connection.query(`
        INSERT INTO categories(name) VALUES ($1)
        `, [newCategory.name]);

        res.sendStatus(201);

    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}
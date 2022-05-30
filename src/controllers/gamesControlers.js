import connection from "../database.js";

export async function getGames(req, res) {
    const name = req.query.name.toLowerCase();
    
    const names = [];

    try {
        const resultGames = await connection.query(`
        SELECT games.*, categories.name
        AS "categoryName"
        FROM games
        JOIN categories
        ON games."categoryId" = categories.id
        `);

        if (!name) return res.status(200).send(resultGames.rows);
        
        if (name) {
            names = resultGames.rows.filter(
                game => new RegExp (`^${name}`).test(game.name.toLowerCase())
            );
        }
        res.status(200).send(names);
        
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

export async function postGames(req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay} = req.body;

    try {
        await connection.query(`
        INSERT INTO games(name, image, "stockTotal", "categoryId", "pricePerDay")
        VALUES ($1, $2, $3, $4, $5);
        `, [name, image, stockTotal, categoryId, pricePerDay]);

        res.sendStatus(201);
        
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}
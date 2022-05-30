import connection from "../database.js";
import gamesSchema from "./../schemas/gamesSchema.js";

export default async function validateGames(req, res, next) {
    const game = req.body;
    
    try {
        const validation = gamesSchema.validate(req.body);
        if (validation.error) return res.sendStatus(400);

        const resultGamesName = await connection.query(`
        SELECT name FROM categories
        WHERE name = $1
        `, [game.name]);

        if (resultGamesName.rowCount >= 0) return res.sendStatus(400);

    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
    
    next();
}
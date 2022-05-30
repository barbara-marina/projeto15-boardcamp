import categoriesSchema from "./../schemas/categoriesSchema.js";

export default async function validateCategories(req, res, next) {
    const newCategory = req.body;

    try {
        const validation = categoriesSchema.validate(newCategory);
        if (validation.error) return res.sendStatus(400);
        
        const resultCategoryName = await connection.query(`
        SELECT id FROM categories WHERE name=$1
        `, [newCategory.name]);
        if (resultCategoryName.rowCount > 0) return res.sendStatus(409);
        
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

    next();
}
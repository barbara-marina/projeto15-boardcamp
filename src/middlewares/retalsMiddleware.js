import rentalsSchema from "./../schemas/rentalsSchema.js";

export default function validateRentals(req, res, next) {
    const validation = rentalsSchema.validate(req.body);
    
    if (validation.error) return res.status(422).send("Unprocessable Entity");
    
    next();
}
import customersSchema from "./../schemas/customersSchema.js";

export default function validateCustomers(req, res, next) {
    const validation = customersSchema.validate(req.body);
    
    if (validation.error) return res.status(422).send("Unprocessable Entity");
    
    next();
}
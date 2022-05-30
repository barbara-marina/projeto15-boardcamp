import joi from "joi";

const customersSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().regex(/^([0-9]{2})([9]{1})?([0-9]{4})([0-9]{4})$/),
    cpf: joi.string().regex(/^\d{11}$/).required(),
    birthday: joi.date().format("YYYY-MM-DD").required()
});

export default customersSchema;
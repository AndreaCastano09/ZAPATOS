const Joi = require('joi');

const zapatoSchema = Joi.object({
    marca: Joi.string().min(2).max(50).required(),
    modelo: Joi.string().min(2).max(50).required(),
    color: Joi.string().min(2).max(50).required(),
    tamaño: Joi.number().min(10).max(50).required(),
    genero: Joi.string().valid('masculino', 'femenino', 'unisex').required(),
    precio: Joi.number().min(0).required(),
    disponibilidad: Joi.boolean().required()
});

module.exports = 
{'zapatoSchema' : zapatoSchema };
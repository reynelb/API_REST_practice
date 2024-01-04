const Joi = require('joi');

//Esqueleto basico de los datos del esquema
const id = Joi.number();
const name = Joi.string();
const age = Joi.number();
const address = Joi.string();
const bio = Joi.string();

//Esqueleto de verificacion de los servicios usando el esquema de los datos
const createUserSchema = Joi.object({
  id: id.required(),
  name: name.required(),
  age: age.required(),
  address: address.required(),
  bio: bio.required()
})

const getOneUserSchema = Joi.object({
  id: id.required()
});

const updateUserSchema = Joi.object({
  name,
  age,
  bio,
  address
});

const deleteUserSchema = Joi.object({
  id: id.required()
});

module.exports = {createUserSchema, getOneUserSchema, updateUserSchema, deleteUserSchema};

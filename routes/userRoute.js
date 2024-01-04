const express = require('express');
const { faker } = require('@faker-js/faker');
const userServices = require('././../services/userServices');
const validatorHandler = require('././../middlewares/validatorHandler');
const { createUserSchema, getOneUserSchema, updateUserSchema, deleteUserSchema } = require('../schemas/userSchema');

const router = express.Router();
const service = new userServices();

router.get('/', async (req, res) => {
  //Calling the method created in the services section
  const users = await service.show();
  //Client's response
  res.json(users);
});

router.get('/:id', validatorHandler(getOneUserSchema, 'params'), async (req, res, next) => {
  const { id } = req.params;
  try{
  const user = await service.findOne(id);
  res.json(user);
  }
  catch (error) {
    next(error);
  }
});

router.post('/', validatorHandler(createUserSchema, 'params'), async (req, res, next) => {
  try{
    const body = req.body;
    const added = await service.add(body);
    res.status(401).json(added);
  }
  catch (error){
    next(error); //Se pasa el error a los middlware con el next(error);
  }
});

router.put('/:id', validatorHandler(updateUserSchema, 'params'),async (req, res, next) => {
  try{
    const { id } = req.params;
    const body = req.body;
    const userUpdate = await service.updateUser(id, body);
    res.status(200).json(userUpdate);
  }
  catch(error) {
    next(error);
  }
});

router.patch('/:id', validatorHandler(updateUserSchema, 'body') ,async (req, res, next) => {
  try{
    const { id } = req.params;
    const body = req.body;
    const user_patched = await service.updateUserPartially(id, body)  ;
    res.status(200).json(user_patched);
  }
  catch(error) {
    next(error);
  }
});

router.delete('/:id', validatorHandler(deleteUserSchema, 'params') ,async (req, res, next) => {
  try {
    const { id } = req.params;
    const userDelete = await service.deleteUser(id);
    res.json(userDelete);
  }
  catch (error) {
    next(error);
  }
});

module.exports = router;

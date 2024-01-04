const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');


const users_amount = 10;

//Clase de la entidad done se definira la logica de negocio
class userServices {
  constructor() {
    this.users = [];
    this.generate(); //Para iniciar de una vez mi DB improvisada

  }

  generate() {
    for (let i = 0; i < users_amount; i++){
      let id = i.toString();
      this.users.push({
        id: id,
        name: faker.person.fullName(),
        age: faker.number.int({min:10, max:100}),
        bio: faker.person.bio(),
        address: faker.location.streetAddress()
      });
    };
  };

  async show() {
    return this.users;
  }

  async findOne(id){
    const user = this.users.find(user => user.id === id);
    if (!user) {
      throw boom.notFound('no se encontro al usuario');
    }
    return user;
  }

  async add(body){
    //Posibles problemas: verificar que no este repetido el usuario
    this.users.push(body);
    return this.users;
  }

  async updateUserPartially(id, changes){
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) {
      throw boom.notFound('no se encontro al usuario')
    }
    const user = this.users[index];
    this.users[index] ={
      ...user,
      ...changes
    }
    return this.users;
  }

  async updateUser(id, changes){
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1){
      throw boom.notFound('no se encontro al susodicho');
    }
    this.users[index] = {
      ...changes
    }
    return this.users;
  }

  async deleteUser(id){
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1){
      throw boom.notFound("no se encontro al susodicho");
    }
    const user = this.users[index];
    this.users.splice(index, 1);
    return this.users;
  }


}

module.exports = userServices;

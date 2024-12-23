// const { Sequelize, Association, Model } = require('sequelize');
const { Sequelize, DataTypes, Model } = require('sequelize');

// Set up a Sequelize instance
const sequelize = new Sequelize('postgres','postgres','bennett12345', {
    host: "localhost",
    dialect: "postgres",
    logging: true,
  },'sqlite::memory:');

// Test the connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL using Sequelize!');
  } catch (error) {
    console.error('Unable to connect to PostgreSQL:', error);
  }
})();


sequelize.sync();


// Product Model
// class Product extends Model {}
// Product.init(
//   {
//     name: DataTypes.STRING,
//   },
//   { sequelize, modelName: 'product' }
// );

// // Tag Model
// class Tag extends Model {}
// Tag.init(
//   {
//     name: DataTypes.STRING,
//   },
//   { sequelize, modelName: 'tag' }
// );

// // Many-to-Many Relationship
// Product.belongsToMany(Tag, { through: 'ProductTags' });
// Tag.belongsToMany(Product, { through: 'ProductTags' });

// (async () => {
//   const phone = await Product.create({ name: 'Smartphone' });
//   const laptop = await Product.create({ name: 'Laptop' });

//   const electronics = await Tag.create({ name: 'Electronics' });
//   const gadgets = await Tag.create({ name: 'Gadgets' });
//   Tag.bulkCreate([
//     { name: 'The Martians' },
//     { name: 'The Earthlings' },
//     { name: 'The Plutonians' },
//   ]);

//   // Associate tags with products
//   await phone.addTag(electronics);
//   await phone.addTag(gadgets);

//   await laptop.addTag(electronics);
// })();
// const fin = Product.findAll({ include: Tag }).then((res)=>console.log(res))


// // Association
class Product extends Model {}
Product.init(
  {
    title: Sequelize.STRING,
  },
  { sequelize, modelName: 'product' },
);
class User extends Model {
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
User.init(
  {
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
  },
  { sequelize, modelName: 'user' },
);

const user = User.findByPk(1);
console.log(user.getFullName());

class Address extends Model {}
Address.init(
  {
    type: DataTypes.STRING,
    line1: Sequelize.STRING,
    line2: Sequelize.STRING,
    city: Sequelize.STRING,
    state: Sequelize.STRING,
    zip: Sequelize.STRING,
  },
  { sequelize, modelName: 'address' },
);

// // We save the return values of the association setup calls to use them later
// Product.User = Product.belongsTo(User);
// User.Addresses = User.hasMany(Address);
// // Also works for `hasOne`

// return Product.create(
//   {
//     title: 'Chair',
//     user: {
//       firstName: 'Mick',
//       lastName: 'Broadstone',
//       addresses: [
//         {
//           type: 'home',
//           line1: '100 Main St.',
//           city: 'Austin',
//           state: 'TX',
//           zip: '78704',
//         },
//       ],
//     },
//   },
//   {
//     include: [
//       {
//         association: Product.User,
//         include: [User.Addresses],
//       },
//     ],
//   },
// );

// const User = sequelize.define('user', { name: DataTypes.STRING }, { timestamps: false });
// const Task = sequelize.define('task', { name: DataTypes.STRING }, { timestamps: false });
// const Tool = sequelize.define(
//   'tool',
//   {
//     name: DataTypes.STRING,
//     size: DataTypes.STRING,
//   },
//   { timestamps: false },
// );
// User.hasMany(Task);
// Task.belongsTo(User);
// User.hasMany(Tool, { as: 'Instruments' });

// const tasks = Task.findAll({ include: User });
// console.log(JSON.stringify(tasks, null, 2));

// getter
// const User = sequelize.define('user', {
//   username: {
//     type: DataTypes.STRING,
//     get() {
//       const rawValue = this.getDataValue('username');
//       return rawValue ? rawValue.toUpperCase() : null;
//     },
//   },
// });

// const user = User.build({ username: 'SuperUser123' });
// console.log(user.username); // 'SUPERUSER123'
// console.log(user.getDataValue('username')); // 'SuperUser123'


// setter
// const User2 = sequelize.define('user2', {
//   username: DataTypes.STRING,
//   password: {
//     type: DataTypes.STRING,
//     set(value) {
//       // Storing passwords in plaintext in the database is terrible.
//       // Hashing the value with an appropriate cryptographic hash function is better.
//       this.setDataValue('password', hash(value));
//     },
//   },
// });

// const user2 = User2.build({
//   username: 'someone',
//   password: 'NotSo§tr0ngP4$SW0RD!',
// });
// console.log(user2.password); // '7cfc84b8ea898bb72462e78b4643cfccd77e9f05678ec2ce78754147ba947acc'
// console.log(user2.getDataValue('password')); // '7cfc84b8ea898bb72462e78b4643cfccd77e9f05678ec2ce78754147ba947acc'

// Combining getters and setters
// const { gzipSync, gunzipSync } = require('zlib');

// const Post = sequelize.define('post', {
//   content: {
//     type: DataTypes.TEXT,
//     get() {
//       const storedValue = this.getDataValue('content');
//       const gzippedBuffer = Buffer.from(storedValue, 'base64');
//       const unzippedBuffer = gunzipSync(gzippedBuffer);
//       return unzippedBuffer.toString();
//     },
//     set(value) {
//       const gzippedBuffer = gzipSync(value);
//       this.setDataValue('content', gzippedBuffer.toString('base64'));
//     },
//   },
// });

// const Test = sequelize.define('Test', {
//     username: { type: DataTypes.STRING, required: true },
//     email: { type: DataTypes.STRING, required: true, unique: true },
//     age: { type: DataTypes.STRING, required: true },
//     place: { type: DataTypes.STRING, required: true },
// },{
//     timestamps : true
// });


// const newUser = new Test({
//     username:"qwe123",
//     email:"qwe@gmail.com",
//     age:22,
//     place:"tiruchengode",
//   });

//   newUser.save();
  
//   Test.findAll({
//     limit: 10,
//     offset: 5
//   }).then(users => {
//     console.log(users);
//   }).catch(error => {
//     console.error('Error fetching records:', error);
//   });

//   Test.destroy({
//     where: {
//       username: 'alice123',
//     },
//   });

// Test.update(
//     { username: 'Ben'},
//     {
//       where: {
//         id: 1,
//       },
//     },
//   );
 
  // Test.update({
  //   order: [['createdAt', 'ASC']], // Sort by createdAt in ascending order
  // }).then(users => {
  //       console.log(users);
  //     }).catch(error => {
  //       console.error('Error fetching records:', error);
  //     });

//   const user = Test.create(
//     {
//       username: 'alice123',
//       isAdmin: true,
//     },
//     { fields: ['username'] },
//   );
  // let's assume the default of isAdmin is false
//   console.log(user.username); // 'alice123'
//   console.log(user.isAdmin);

//   const [user, created] = Test.findOrCreate({
//     where: { username: 'sdepold' },
//     defaults: {
//       job: 'Technical Lead JavaScript',
//     },
//   });
//   console.log(user.username); // 'sdepold'
//   console.log(user.job); // This may or may not be 'Technical Lead JavaScript'
//   console.log(created); // The boolean indicating whether this instance was just created
//   if (created) {
//     console.log(user.job); // This will certainly be 'Technical Lead JavaScript'
//   }

// const User1 = sequelize.define('user1', {
//   name: DataTypes.STRING,
//   age: { type: DataTypes.STRING, required: true },
//  }, { timestamps: false });
// const jane = User1.create({ name: 'Jane', age: 100 });
// // jane.increment({
// //   age: 2,
// // });
// User1.increment( 'age', { by: 5, where: { id: 1 } })


// jane.increment(['age', 'cash'], { by: 2 });
// jane.name = 'Ada';
// jane.reload();
// console.log(jane.name);


//const { gzipSync, gunzipSync } = require('zlib');

// const Post = sequelize.define('post', {
//   content: {
//     type: DataTypes.TEXT,
//     get() {
//       const storedValue = this.getDataValue('content');
//       const gzippedBuffer = Buffer.from(storedValue, 'base64');
//       const unzippedBuffer = gunzipSync(gzippedBuffer);
//       return unzippedBuffer.toString();
//     },
//     set(value) {
//       const gzippedBuffer = gzipSync(value);
//       this.setDataValue('content', gzippedBuffer.toString('base64'));
//     },
//   },
// });

// const post =  Post.create({ content: 'Hello everyone!' });

// console.log(post.content); // 'Hello everyone!'
// Everything is happening under the hood, so we can even forget that the
// content is actually being stored as a gzipped base64 string!

// However, if we are really curious, we can get the 'raw' data...
// console.log(post.getDataValue(' '));
// Output: 'H4sIAAAAAAAACvNIzcnJV0gtSy2qzM9LVQQAUuk9jQ8AAAA='
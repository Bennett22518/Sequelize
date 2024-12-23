const { Sequelize } = require('sequelize');
const { DataTypes } = require('sequelize');

// Set up a Sequelize instance
const sequelize = new Sequelize('postgres','postgres','bennett12345', {
    host: "localhost",
    dialect: "postgres",
    logging: true,
  });

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

// const User = sequelize.define('user', {
//     username: {
//       type: DataTypes.STRING,
//       password: {
//         type: DataTypes.STRING,
//         set(value) {
//           this.setDataValue('password', hash(value));
//         },
//       },
//     },
//   });

//   User.truncate();

//   const user = User.build({
//     username: 'someone',
//     password: 'NotSo§tr0ngP4$SW0RD!',
//   });
//   console.log(user.password); // '7cfc84b8ea898bb72462e78b4643cfccd77e9f05678ec2ce78754147ba947acc'
//   console.log(user.getDataValue('password'));

//   const user = User.build({ username: 'SuperUser123' });
// console.log(user.username); // 'SUPERUSER123'
// console.log(user.getDataValue('username')); // 'SuperUser123'



const Test = sequelize.define('Test', {
    username: { type: DataTypes.STRING, required: true },
    email: { type: DataTypes.STRING, required: true, unique: true },
    age: { type: DataTypes.STRING, required: true },
    place: { type: DataTypes.STRING, required: true },
},{
    timestamps : true
});


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
 
  Test.update({
    order: [['createdAt', 'ASC']], // Sort by createdAt in ascending order
  }).then(users => {
        console.log(users);
      }).catch(error => {
        console.error('Error fetching records:', error);
      });

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
// console.log(post.getDataValue('content'));
// Output: 'H4sIAAAAAAAACvNIzcnJV0gtSy2qzM9LVQQAUuk9jQ8AAAA='
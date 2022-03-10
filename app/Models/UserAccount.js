import Sequelize from 'sequelize';

const sequelize = createPool({
    port: 5432,
    host: process.env.DB_CONNECTION,  
    user: process.env.DB_USERNAME, 
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME,
    connectionLimit: 0,  // default value  
  });
//const sequelize = new Sequelize('postgres://postgres:123Fall@2021@localhost:5432/UserAccount')
sequelize
.authenticate()
.then(() => {
console.log('Connection has been established successfully.');
})
.catch(err => {
console.error('Unable to connect to the database:', err);
});
const User = sequelize.define('user', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
        allowNull:true
      },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false
    }
    
});
export default User;
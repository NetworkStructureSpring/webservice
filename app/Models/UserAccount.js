import Sequelize from 'sequelize';
import fs from 'fs';
const rdsCa = secrets.TEST
console.log("I am here!!");
console.log(rdsCa);

var connectionString = "";
//const sequelize = new Sequelize('postgres://postgres:123Fall@2021@localhost:5432/UserAccount')
function setConnectionString()
{
    connectionString = process.env.DB_CONNECTION;
    console.log(connectionString);
}
setConnectionString();
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: 'postgres',
    host: connectionString,
    port: 5432,
    pool: {
      max: 10,
      idle: 30000
    },
    ssl: {
        rejectUnauthorized: true,
        ca: [rdsCa]
    }
})
async function connect() {
    console.log('Checking database connection...');
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      process.exit(1);
    }
}
connect();
    
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
    },
    verifiedUser: {
        type: Sequelize.BOOLEAN
    }
    
});
User.sync({ force: true });
export default User;

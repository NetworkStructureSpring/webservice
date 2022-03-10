import Sequelize from 'sequelize';

var sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_CONNECTION,
    port: 5432,
    logging: console.log,
    maxConcurrentQueries: 100,
    dialect: 'postgres',
    dialectOptions: {
        ssl:'Amazon RDS'
    },
    pool: { maxConnections: 5, maxIdleTime: 30},
    language: 'en'
})
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
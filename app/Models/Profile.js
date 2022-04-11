import Sequelize from 'sequelize';
var connectionString = "";
const sequelize = new Sequelize('postgres://postgres:123Fall@2021@localhost:5432/UserAccount')
// function setConnectionString()
// {
//     connectionString = process.env.DB_CONNECTION;
//     console.log(connectionString);
// }
// setConnectionString();
// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
//     dialect: 'postgres',
//     host:  connectionString,
//     port: 5432,
//     pool: {
//       max: 10,
//       idle: 30000
//     },
// })
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
const Profile = sequelize.define('profile', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
        allowNull:true
      },
    file_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    upload_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    user_id: {
        type: Sequelize.UUID,
        allowNull: false
    }
    
});
Profile.sync({ force: true });
export default Profile;
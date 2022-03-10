import Sequelize from 'sequelize';

const sequelize = new Sequelize('UserAccount', 'postgres', '123Fall@2021', {
    dialect:  'postgres'
  });
// const sequelize = new Sequelize('postgres://postgres:123Fall@2021@localhost:5432/UserAccount')
sequelize
.authenticate()
.then(() => {
console.log('Connection has been established successfully.');
})
.catch(err => {
console.error('Unable to connect to the database:', err);
});
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
//Profile.sync({ force: true });
export default Profile;
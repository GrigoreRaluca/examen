import Sequelize from 'sequelize';
import {DB_USERNAME, DB_PASSWORD} from './ConstanteBD.js';


const db=new Sequelize({
dialect:'mysql',
database:'Examen',
username:DB_USERNAME,
password:DB_PASSWORD,
logging:false,
define: {
    timestamps:false,
    freezeTableName:true
}
})

export default db;
import db from '../configurareBD.js';
import Sequelize from 'sequelize';

const Ship = db.define("Ship", {
    ShipId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    ShipNume: {
        type: Sequelize.STRING,
        validate: {
            len: {
                args: [3, 200],
                msg: "Numele shipului tb sa aiba mai mult de 3 caractere!"
            }
        },
        allowNull: false
    },
    ShipDisplacement: {
        type: Sequelize.INTEGER,
        validate: {
            isNumeric: {
                min: 51,
                msg: "Numarul trebuie sa fie mai mare ca 50!"
            }
        },
        allowNull: false
    }

})

export default Ship;
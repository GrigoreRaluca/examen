import db from '../configurareBD.js';
import Sequelize from 'sequelize';

const CrewMember = db.define("CrewMember", {
    CrewMemberId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    CrewMemberNume: {
        type: Sequelize.STRING,
        validate: {
            len: {
                args: [5, 500],
                msg: "Numele CrewMemberului trebuie sa aiba cel putin 5 caractere!"
            }
        },
        allowNull: false
    },
    CrewMemberRol: {
        type: Sequelize.STRING,
        validate: {
            isIn: {
                args: [['CAPTAIN', 'BOATSWAIN', 'COOK']],
                msg: "Trebuie sa fie CAPTAIN, BOATSWAIN SAU COOK"
            }
        },
        allowNull: false
    },
    ShipId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

})

export default CrewMember;
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import mysql from 'mysql2/promise';
import {DB_USERNAME,DB_PASSWORD} from './ConstanteBD.js';
import db from './configurareBD.js';
import Ship from './entitati/Ship.js';
import CrewMember from './entitati/CrewMember.js';
import LikeOperator from './Operators.js';

//import fs from 'fs'
'use strict';
let app=express();
let router=express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use("/api",router);

let connect;
mysql.createConnection({
    user:DB_USERNAME,
    password:DB_PASSWORD
}).then(connection=>{
connect=connection;
return connection.query("CREATE DATABASE IF NOT EXISTS Examen");
}).then(()=>{
    return connect.end();
}).catch(err=>{console.log(err);
});

//relatie one to many
Ship.hasMany(CrewMember, { as: "CrewMember", foreignKey: "ShipId" });
CrewMember.belongsTo(Ship, { foreignKey: "ShipId" });
//sfarsit relatie

//--- operatii----

//-----------get/read----

async function getShipsFull() { 
    return await Ship.findAll({ include: ["CrewMember"] });
}
router.route('/getShipsFull').get(async (req, res) => {
    try {
        return res.json(await getShipsFull());
    }
    catch (err) {
        console.log(err.message);
    }
}) //http://localhost:8000/api/getShipsFull

//fara referinte
async function getShips() {
    return await Ship.findAll();
}
router.route('/getShips').get(async (req, res) => {
    try {
        return res.json(await getShips());
    }
    catch (err) {
        console.log(err.message);
    }
})


//get ship by id
async function getShipById(id) {
    return await Ship.findOne({
        where: id ? { ShipId: id } : undefined
    });
}
router.route('/getShipById/:id').get(async (req, res) => {
    try {
        return res.json(await getShipById(req.params.id));
    }
    catch (err) {
        console.log(err.message);
    }
})
//---crewMember
//get referinte - toate referintele simple
async function getCrewMembers() {
    return await CrewMember.findAll();
}
router.route('/getCrewMembers').get(async (req, res) => {
    try {
        return res.json(await getCrewMembers());
    }
    catch (err) {
        console.log(err.message);
    }
})


async function getCrewMemberByShip(idShip, idCrewMember) {
   
    if ((!await getShipById(idShip))) {
        console.log("Nu s-a gasit shipul!");
        return;
    }
    return await CrewMember.findOne(
        {
            include: [{ model: Ship, attributes: ["ShipNume"], where: idShip ? { ShipId: idShip } : undefined }],
            where: idCrewMember ? { CrewMemberId: idCrewMember } : undefined
        }
    )

}
router.route('/getCrewMemberByShip/:idShip/:idCrewMember').get(
    async (req, res) => {
        try {
            return res.json(await getCrewMemberByShip(req.params.idShip, req.params.idCrewMember));

        } catch (err) {
            console.log(err.message);
        }
    }
)

//sortarea o vom face dupa nume
async function getShipsSortateAlfabetic() {
    return await Ship.findAll({
        order: [

            ["ShipNume", "ASC"]
        ]
    });
}
router.route('/getShipsSortateAlfabetic').get(async (req, res) => {
    try {
        return res.json(await getShipsSortateAlfabetic());
    }
    catch (err) {
        console.log(err.message);
    }
})


//filtrare pe get dupa 2 campuri pe prima entitate
//avem nevoi ede un opetarot deci facem un fisier operatori
async function getShipsFilter(filterQuery) {
    let whereClause = {};
    if (filterQuery.nume)
        whereClause.ShipsNume = { [LikeOperator]: `%${filterQuery.nume}%` };
    if (filterQuery.displacement)
        whereClause.ShipDisplacement = { [LikeOperator]: `%${filterQuery.displacement}%` };

    return await Ship.findAll({
        where: whereClause
    })
}
router.route('/getShipsFilter').get(async (req, res) => {
    try {
        return res.json(await getShipsFilter(req.query));
    }
    catch (err) {
        console.log(err.message);
    }
})
//http://localhost:8000/api/getShipsFilter?nume=Titanic&displacement=200





//------POST/INSERT------
//Ship
async function createShip(ship) {
    return await Ship.create(ship);
}
router.route('/addShip').post(async (req, res) => {
    try {
        return res.status(201).json(await createShip(req.body));
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ error_message: "Internal server error could not insert ship" });
    }
})
//http://localhost:8000/api/addShip
//{
//  "ShipNume" :"Titanic",
//"ShipDisplacement":"200"    
//}
//-----
//CrewMember
async function createCrewMember(crewMember, idShip) {
    //verificam dc exista articolul pt care vrem sa adaugam referinta
    if (!(await getShipById(idShip))) {
        console.log("Nu s-a gasit shipul");
        return;
    }
    crewMember.ShipId = idShip;

    return await CrewMember.create(crewMember);
}
router.route('/addCrewMember/:idShip').post(async (req, res) => {
    try {
        return res.status(201).json(await createCrewMember(req.body, req.params.idShip));
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ error_message: "Internal server error could not insert crewMember" });
    }
})
//http://localhost:8000/api/addCrewMember/1
// {
// "CrewMemberNume":"Popescu Ion",
// "CrewMemberRol":"COOK"
//}




//put=updaate
//update articol. seaman cu insertul
async function updateShip(updatedShip, idShip) {
    if (parseInt(idShip) !== updatedShip.ShipId) {
        console.log("id diferit intre id ruta si id body");
    }
    let ship = await getShipById(idShip);
    if (!ship) {
        console.log("Nu exista shipul cu acest id");
        return;
    }
    return await ship.update(updatedShip);


}
router.route("/updateShip/:idShip").put(async (req, res) => {
    try {
        return res.json(await updateShip(req.body, req.params.idShip));
    } catch (err) {
        console.log(err.message);
    }
})
//put referinta 
async function updateCrewMember(updatedCrewMember, idShip, idCrewMember) {
    //exista ref sau nu
    if (parseInt(idCrewMember) !== updatedCrewMember.CrewMemberId) {
        console.log("id referinta diferit intre id ruta si id body");
        return;
    }
  
    let ship = await getShipById(idShip);
    if (!ship) {
        console.log("Nu exista shipul cu acest id");
        return;
    }
    
    let crewMember = await getCrewMemberByShip(idShip, idCrewMember);
    if (!crewMember) {
        console.log("Nu exista crewMember pt acest ship");
        return;
    }

    return await crewMember.update(updatedCrewMember);


}
router.route("/updateCrewMember/:idShip/:idCrewMember").put(async (req, res) => {
    try {
        return res.json(await updateCrewMember(req.body, req.params.idShip, req.params.idCrewMember));
    } catch (err) {
        console.log(err.message);
    }
})


//sfarsit put-------------------------------

//delete-------------------------------------

async function deleteShip(idShip) {
    //vf daca exista
    let shipToBeDeleted = await getShipById(idShip);
    if (!shipToBeDeleted) {
        console.log("Nu exista Ship cu acest id");
        return;
    }
    return await shipToBeDeleted.destroy();
}
router.route("/deleteShip/:idShip").delete(async (req, res) => {
    try {
        return res.json(await deleteShip(req.params.idShip));

    } catch (err) {
        console.log(err.message);
    }
})


async function deleteCrewMember(idShip, idCrewMember) {
   
    let ship = await getShipById(idShip);
    if (!ship) {
        console.log("Nu exista ship cu acest id");
        return;
    }

    let crewMemberToBeDeleted = await getCrewMemberByShip(idShip, idCrewMember);

    if (!crewMemberToBeDeleted) {
        console.log("Nu exista crewMember cu acest id la acest ship");
        return;
    }
    return await crewMemberToBeDeleted.destroy();
}
router.route("/deleteCrewMember/:idShip/:idCrewMember").delete(async (req, res) => {
    try {
        return res.json(await deleteCrewMember(req.params.idShip, req.params.idCrewMember));

    } catch (err) {
        console.log(err.message);
    }
})



//sfarsit delete---------------------------



let port=process.env.PORT || 8000;
app.listen(port,async ()=>{
    await db.sync({alter:true});
    console.log("BD sincronizata");
});
console.log("API is running on port "+ port);

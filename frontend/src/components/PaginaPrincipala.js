import { useState, useEffect } from 'react';
import { get, getQuery, remove } from '../Calls.js';
import { useNavigate } from 'react-router-dom';
import { routeGetShipsFilter, routeGetShipsSortate, routeDeleteShip, routeGetShips } from '../ApiRoutes';

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Grid, TextField, Button, Paper, Table, TableBody, TableCell, TableRow, TableContainer, TableHead, IconButton } from "@material-ui/core";

export default function PaginaPrincipala() {

    const navigate = useNavigate();

    const [rows, setRows] = useState([]);
    const [needToUpdate, setNeedToUpdate] = useState(false)
    const [filtrare, setFiltrare] = useState({
        ShipNume: "",
        ShipDisplacement: 0
    })


    useEffect(async () => {
        let data = await get(routeGetShips);
        setRows(data);
    }, [needToUpdate]);
    useEffect(async () => {
        sessionStorage.clear();
    }, [])

    const goToFormularAdaugareNava = () => {
        sessionStorage.setItem("putScreen", "false");
        navigate('/formularNava');
    }
    const deleteShip = async (id, index) => {
        await remove(routeDeleteShip, id);

        rows.splice(index, 1);
        setRows(rows);
        setNeedToUpdate(!needToUpdate);
    }
    const sortare = async () => {
        let data = await get(routeGetShipsSortate);
        setRows(data);
    }
    

    return (
        <div>
            <Grid container spacing={2}
                direction="row"
                justifyContent="space-evenly"
                alignItems="center">

                <Grid container item spacing={1} xs={3}
                    direction="column"
                    justifyContent="center"
                    alignItems="center">

                    <TextField
                        margin="dense"
                        id="NumeNava"
                        name="NumeNava"
                        label="Filtrare dupa nume"
                        fullWidth
                        value={filtrare.NumeNava}
                       // onChange={e => onChangeFiltrare(e)}
                    />
                    <TextField
                        margin="dense"
                        id="DeplasareNava"
                        name="DeplasareNava"
                        label="Filtrare dupa deplasare"
                        fullWidth
                        value={filtrare.DeplasareNava}
                        //onChange={e => onChangeFiltrare(e)}
                    />
                    <Button color="primary" variant='contained'
                    // onClick={() =>filtrareShips()}
                    >
                        Filtrare
                    </Button>

                </Grid>

                <Grid item xs={2}>
                    <Button color="primary" variant='contained' startIcon={<AddIcon />}
                     onClick={() => goToFormularAdaugareNava()}
                    >
                        Adauga nava
                    </Button >
                </Grid>

                <Grid item xs={2}>
                    <Button color="primary" variant='contained' 
                    onClick={() => sortare()}
                    >
                        Sorteaza dupa data
                    </Button >
                </Grid>

               
            </Grid>

            <br />

            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID Nava</TableCell>
                            <TableCell align="center">Nume nava</TableCell>
                            <TableCell align="center">Deplasare</TableCell>
                            <TableCell align="center">Membrii echipaj</TableCell>
                            <TableCell align="center">Actiuni nava</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={row.ArticolId}>
                                <TableCell component="th" scope="row">
                                    {row.idShip}
                                </TableCell>
                                <TableCell align="center">{row.NumeNava}</TableCell>
                                <TableCell align="center">{row.DeplasareNava}</TableCell>
                                <TableCell align="center">
                                    <Button color="primary" variant='contained' startIcon={<AddIcon />} 
                                    //onClick={() => goToFormularAdaugareMembruEchipaj(row.idShip)}
                                    >
                                        Adauga membru
                                    </Button>
                                    <br /> <br />
                                    <Button color="primary" variant='contained' 
                                   // onClick={() => goToTabelMembriiEchipaj(row.idShip)}
                                    >
                                        Vezi membrii
                                    </Button>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton 
                                   // onClick={() => goToFormularModificareNava(row.idShip)}
                                    >
                                        <EditIcon color="primary" />
                                    </IconButton>
                                    <IconButton 
                                    onClick={() => deleteShip(row.idShip, index)}
                                    >
                                        <DeleteIcon color="secondary" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    )
}
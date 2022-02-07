import { useState, useEffect } from 'react';
import { get, put, post } from '../Calls.js';
import { useNavigate } from 'react-router-dom';
import { routePostArticol, routeGetArticolById, routePutArticol, routePostShip, routeGetShipById } from '../ApiRoutes';

import SaveIcon from '@material-ui/icons/Save'
import { Grid, TextField, Button } from '@material-ui/core';

export default function formularNava() {

  

    return (
        <div>
            <Grid container
                spacing={2}
                direction="row"
                justifyContent="flex-start">

                <Grid item xs={2}>
                    <TextField
                        margin="dense"
                        id="ShipId"
                        name="ShipId"
                        label="Id-ul navei"
                        fullWidth
                        disabled={true}
                       // value={ship.ShipId}
                       // onChange={e => onChangeShip(e)} 
                       />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        margin="dense"
                        id="ShipNume"
                        name="ShipNume"
                        label="Numele navei"
                        fullWidth
                       // value={ship.ShipNume}
                       // onChange={e => onChangeShip(e)} 
                       />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        margin="dense"
                        id="NavaDeplasare"
                        name="NavaDeplasare"
                        label="Deplasarea navei"
                        fullWidth
                       // value={ship.ShipDeplasare}
                        //onChange={e => onChangeShip(e)}
                         />
                </Grid>
            </Grid>

            <br />

            <Button color="primary" variant='contained' startIcon={<SaveIcon />} 
            >
                Save
            </Button>
        </div>
    )
}
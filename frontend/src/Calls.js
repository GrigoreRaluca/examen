import axios from 'axios'
import{
    routeGetShipsFull, routeGetShips, routeGetShipById,routeGetCrewMembers, routeGetCrewMemberByShip,
    routeGetCrewMembersByShip, routeGetShipsFilter,routeGetShipsSortate, routeExportShipsFull,
    routePostShip,  routePostCrewMember,
    routeDeleteShip, routeDeleteCrewMember,
    routePutShip, routePutCrewMember
} from './ApiRoutes.js'

async function get(p_url, searchAfter1 = null, searchAfter2 = null) {
    try {
        let newUrl;
        if (searchAfter1) {
            newUrl = p_url + "/" + searchAfter1;
            if (searchAfter2) {
                newUrl = newUrl + "/" + searchAfter2;
            }
        } else {
            newUrl = p_url;
        }

        return (await axios.get(newUrl)).data;

    } catch (err) {
        if (p_url === routeGetShipsFull)
            alert('Nu s-au putut prelua navele full.');
        if (p_url === routeGetShips)
            alert('Nu s-au putut prelua navele.');
        if (p_url === routeGetCrewMembers)
            alert('Nu s-au putut prelua membrii echipajului.');
        if (p_url === routeGetShipsSortate)
            alert('Nu s-au putut prelua navele sortate alfabetic.');
        if (p_url ===  routeExportShipsFull)
            alert('Nu s-au putut exporta navele.');
        if (p_url ===  routeGetShipById)
            alert('Nu s-a putut prelua navele cu acest id.');
        if (p_url === routeGetCrewMemberByShip)
            alert('Nu s-au putut prelua membrii echipajului de pe aceasta nava.');
        if (p_url === routeGetCrewMembersByShip)
            alert('Nu s-au putut prelua membrii echipajului de pe aceasta nava.');
    }
}


async function getQuery(p_url, p_nume, p_deplasare) {
    try {
        const params = new URLSearchParams({ nume: p_nume, displacement: p_deplasare });
        let urlFilter = p_url + "?";
        return (await axios.get(`${urlFilter}${params}`)).data;
    } catch (err) {
        alert("Nu s-au putut prelua navele filtrate dupa nume si/sau deplasare.");
    }
}


async function post(p_url, item, id = null) {
    try {
        let newUrl = id ? p_url + "/" + id : p_url;
        return (await axios.post(
            newUrl,
            item,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).data;
    } catch (err) {
        if (p_url === routePostShip) {
            alert('Eroare la inserare nava!');
        }
        if (p_url === routePostCrewMember) {
            alert('Eroare la inserare membru echipaj!');
        }
    }
}


async function put(p_url, item, searchAfter1, searchAfter2 = null) {
    try {
        let newUrl;
        newUrl = p_url + "/" + searchAfter1;
        if (searchAfter2) {
            newUrl = newUrl + "/" + searchAfter2;
        }

        return (await axios.put(
            newUrl,
            item,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).data;
    } catch (err) {
        if (p_url === routePutShip) {
            alert('Eroare la modificare nava!');
        }
        if (p_url === routePutCrewMember) {
            alert('Eroare la modificare membru echipaj!');
        }
    }
}


async function remove(p_url, searchAfter1, searchAfter2 = null) {
    try {
        let newUrl;
        newUrl = p_url + "/" + searchAfter1;
        if (searchAfter2) {
            newUrl = newUrl + "/" + searchAfter2;
        }

        return (await axios.delete(newUrl)).data;
    } catch (err) {
        if (p_url === routeDeleteShip) {
            alert('Eroare la stergere nava!');
        }
        if (p_url === routeDeleteCrewMember) {
            alert('Eroare la stergere membru echipaj!');
        }
    }
}


export { get, getQuery, post, put, remove }
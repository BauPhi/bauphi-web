import React from "react";
import classNames from "classnames";
import {makeStyles} from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import {userActions} from '../../_actions';
import {history} from '../../_helpers';
import {useDispatch} from 'react-redux';
import axios from "axios";


const useStyles = makeStyles(styles);

export default function AdminNavbarLinks() {
    const classes = useStyles();
    const [openNotification, setOpenNotification] = React.useState(null);
    const [openProfile, setOpenProfile] = React.useState(null);
    const [openG, setOpenG] = React.useState(false);
    const [listOffersSent, setListOffersSent] = React.useState([]);
    const [listOffersResulted, setListOffersResulted] = React.useState([]);
    const [listOffersReceived, setListOffersReceived] = React.useState([]);
    const [homeOwner, setHomeOwner] = React.useState({});
    const [showInfo, setShowInfo] = React.useState(false);


    const handleClickNotification = event => {
        if (openNotification && openNotification.contains(event.target)) {
            setOpenNotification(null);

        } else {
            setOpenNotification(event.currentTarget);

        }
        setOpenG(false);
    };
    const handleCloseNotification = () => {
        setOpenNotification(null);
        setOpenG(false);
    };
    const handleClickProfile = event => {
        if (openProfile && openProfile.contains(event.target)) {
            setOpenProfile(null);
        } else {
            setOpenProfile(event.currentTarget);
        }
    };
    const dispatch = useDispatch();
    const handleCloseProfile = () => {
        setOpenProfile(null);
    };
    const handleCloseProfileAndLogout = () => {
        setOpenProfile(null);
        dispatch(userActions.logout());
        history.push("/");
    };

    const handleClickOpenG = () => {
        setOpenG(true);
    };

    function handleDeleteOfferButtonClick(offerIndex)
    {
        console.log(listOffersSent[offerIndex]);

        let home_id = listOffersSent[offerIndex].home
        let user_id = JSON.parse(localStorage.getItem('user'));
        user_id = user_id['user']['user_id'];

        axios.delete(`https://bauphi-api.herokuapp.com/api/users/${user_id}/interactions/delete-request/${home_id}`,
            {headers: {'Content-Type': 'application/json', 'session_key': 'admin'}})
            .then((response) => {
                if (response.data.status === "SUCCESS") {
                    let filteredArray = listOffersSent.filter(item => item !== listOffersSent[offerIndex])
                    filteredArray = filteredArray.filter(item => item.results === "Pending")
                    let filteredArray2 = listOffersSent.filter(item => item !== listOffersSent[offerIndex])
                    filteredArray2 = filteredArray2.filter(item => item.results === "Accepted")
                    setListOffersSent(filteredArray);
                    setListOffersResulted(filteredArray2);
                    loadOffersSent();
                    loadOffersReceived();
                }
                console.log(response);
            })
    }

    function handleDeleteResultedOfferButtonClick(offerIndex)
    {
        console.log(listOffersResulted[offerIndex]);

        let home_id = listOffersResulted[offerIndex].home
        let user_id = JSON.parse(localStorage.getItem('user'));
        user_id = user_id['user']['user_id'];

        axios.delete(`https://bauphi-api.herokuapp.com/api/users/${user_id}/interactions/delete-request/${home_id}`,
            {headers: {'Content-Type': 'application/json', 'session_key': 'admin'}})
            .then((response) => {
                if (response.data.status === "SUCCESS") {
                    let filteredArray2 = listOffersSent.filter(item => item !== listOffersResulted[offerIndex])
                    filteredArray2 = filteredArray2.filter(item => item.results === "Accepted")
                    setListOffersResulted(filteredArray2);
                }
                console.log(response);
            })
    }

    function handleProvideInfo(offerIndex)
    {
        console.log(listOffersSent[offerIndex]);

        let user_id = listOffersResulted[offerIndex].home_owner

        axios.get(`https://bauphi-api.herokuapp.com/api/users/${user_id}`,
            {headers: {'Content-Type': 'application/json', 'session_key': 'admin'}})
            .then((response) => {
                if (response.data.status === "SUCCESS") {
                    let user = response.data.user;
                    setHomeOwner(user);
                    setShowInfo(true);
                }
                console.log(response);
            })
    }

    function handleCloseInfoDialog() {
        setShowInfo(false)
        setHomeOwner({})
    }

    function handleAcceptOffer(offerIndex)
    {
        console.log("handleAcceptOffer", listOffersReceived[offerIndex]);

        let user_id = JSON.parse(localStorage.getItem('user'));
        user_id = user_id['user']['user_id'];
        var postData = { home: listOffersReceived[offerIndex].home, victim: listOffersReceived[offerIndex].victim };
        let axiosConfig = { headers: {'Content-Type': 'application/json', 'session_key': 'admin' } };

        axios.patch(`https://bauphi-api.herokuapp.com/api/users/${user_id}/interactions/accept-request`,
            postData, axiosConfig)
            .then((response) => {
                if (response.data.status === "SUCCESS") {
                    loadOffersReceived();
                    // history.push("/");
                    // history.push("/ev_ilanlari");
                }
                console.log(response);
            })
    }

    function handleRejectOffer(offerIndex)
    {
        console.log("handleRejectOffer", listOffersReceived[offerIndex]);

        let user_id = JSON.parse(localStorage.getItem('user'));
        user_id = user_id['user']['user_id'];
        var postData = { home: listOffersReceived[offerIndex].home, victim: listOffersReceived[offerIndex].victim };
        let axiosConfig = { headers: {'Content-Type': 'application/json', 'session_key': 'admin' } };

        axios.patch(`https://bauphi-api.herokuapp.com/api/users/${user_id}/interactions/reject-request`,
            postData, axiosConfig)
            .then((response) => {
                if (response.data.status === "SUCCESS") {
                    loadOffersReceived();
                    // history.push("/");
                    // history.push("/ev_ilanlari");
                    // let filteredArray = listOffersSent.filter(item => item !== listOffersSent[offerIndex])
                    // setListOffersSent(filteredArray);
                }
                console.log(response);
            })
    }

    function loadOffersSent()
    {
        let user_id = JSON.parse(localStorage.getItem('user'));
        user_id = user_id['user']['user_id'];

        axios.get(`https://bauphi-api.herokuapp.com/api/users/${user_id}/interactions/sent-request-list`,
            {headers: {'Content-Type': 'application/json', 'session_key': 'admin'}})
            .then((response) => {
                if (response.data.status === "SUCCESS") {
                    let filteredArray = response.data.requests.filter(item => item.results === "Pending")
                    setListOffersSent(filteredArray);
                    let filteredArray2 = response.data.requests.filter(item => item.results === "Accepted")
                    setListOffersResulted(filteredArray2);
                }
            })
    }

    function loadOffersReceived()
    {
        let user_id = JSON.parse(localStorage.getItem('user'));
        user_id = user_id['user']['user_id'];

        axios.get(`https://bauphi-api.herokuapp.com/api/users/${user_id}/interactions/received-request-list`,
            {headers: {'Content-Type': 'application/json', 'session_key': 'admin'}})
            .then((response) => {
                if (response.data.status === "SUCCESS") {
                    setListOffersReceived(response.data.requests);
                }
            })
    }

    React.useEffect(() => {
        console.log("handleListOffersSent");

        let user_id = JSON.parse(localStorage.getItem('user'));
        user_id = user_id['user']['user_id'];

        axios.get(`https://bauphi-api.herokuapp.com/api/users/${user_id}/interactions/sent-request-list`,
            {headers: {'Content-Type': 'application/json', 'session_key': 'admin'}})
            .then((response) => {
                if (response.data.status === "SUCCESS") {
                    let filteredArray = response.data.requests.filter(item => item.results === "Pending")
                    setListOffersSent(filteredArray);
                    let filteredArray2 = response.data.requests.filter(item => item.results === "Accepted")
                    setListOffersResulted(filteredArray2);
                }
            })
    }, []);

    React.useEffect(() => {
        console.log("handleListOffersReceived");

        let user_id = JSON.parse(localStorage.getItem('user'));
        user_id = user_id['user']['user_id'];

        axios.get(`https://bauphi-api.herokuapp.com/api/users/${user_id}/interactions/received-request-list`,
            {headers: {'Content-Type': 'application/json', 'session_key': 'admin'}})
            .then((response) => {
                if (response.data.status === "SUCCESS") {
                    setListOffersReceived(response.data.requests);
                }
            })
    }, []);

    React.useEffect(()=>{console.log("offers rcv", listOffersReceived)},[listOffersReceived])

    return (
        <div>
            <div className={classes.manager}>
                <Button
                    color={window.innerWidth > 959 ? "transparent" : "white"}
                    justIcon={window.innerWidth > 959}
                    simple={!(window.innerWidth > 959)}
                    aria-owns={openNotification ? "notification-menu-list-grow" : null}
                    aria-haspopup="true"
                    onClick={handleClickNotification}
                    className={classes.buttonLink}
                >
                    <Notifications className={classes.icons}/>

                    <Hidden mdUp implementation="css">
                        <p onClick={handleCloseNotification} className={classes.linkText}>
                            Notification
                        </p>
                    </Hidden>
                </Button>
                <Poppers
                    open={Boolean(openNotification)}
                    anchorEl={openNotification}
                    transition
                    disablePortal
                    className={
                        classNames({[classes.popperClose]: !openNotification}) +
                        " " +
                        classes.popperNav
                    }
                >
                    {({TransitionProps, placement}) => (
                        <Grow
                            {...TransitionProps}
                            id="notification-menu-list-grow"
                            style={{
                                transformOrigin:
                                    placement === "bottom" ? "center top" : "center bottom"
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleCloseNotification}>
                                    <MenuList role="menu">
                                        <MenuItem
                                            onClick={handleClickOpenG}
                                            className={classes.dropdownItem}
                                        >
                                            <div>

                                            <Dialog open={showInfo} onClose={handleCloseInfoDialog}
                                                        aria-labelledby="form-dialog-title">

                                                    <DialogTitle id="form-dialog-title">Ev Sahibinin İletişim Bilgileri</DialogTitle>

                                                    <DialogContent>

                                                    <DialogContentText>
                                                        <div>
                                                        Adı: {homeOwner.name}
                                                        </div>
                                                        <div>
                                                        Telefon Numarası: {homeOwner.phone}
                                                        </div>
                                                        <div>
                                                        Email: {homeOwner.email}
                                                        </div>
                                                    </DialogContentText>
                                                    
                                                    <Button onClick={handleCloseInfoDialog}
                                                                            color="danger">
                                                                        Kapat
                                                    </Button>
                                                    </DialogContent>
                                                    

                                                </Dialog>

                                                <Dialog open={openG} onClose={handleCloseNotification}
                                                        aria-labelledby="form-dialog-title">

                                                    <DialogTitle id="form-dialog-title">Kabul Edilen İsteklerim</DialogTitle>

                                                    <DialogContent>
                                                    
                                                    {
                                                        listOffersResulted.length === 0 ? 
                                                    <DialogContentText>
                                                        Kabul edilen bir isteğiniz bulunmuyor.
                                                    </DialogContentText>
                                                    :
                                                    
                                                    listOffersResulted.map((el, i) =>
                                                        <div>
                                                            <DialogContentText key={i}>
                                                                {el.description}
                                                            </DialogContentText>
                                                            <DialogActions>
                                                                <Button onClick={(el) => handleProvideInfo(i)}
                                                                        color="secondary">
                                                                    İletişim
                                                                </Button>
                                                                <Button onClick={(el) => handleDeleteResultedOfferButtonClick(i)}
                                                                        color="danger">
                                                                    Sil
                                                                </Button>
                                                            </DialogActions>
                                                        </div>
                                                    )
                                                    
                                                    }

                                                    
                                                    </DialogContent>

                                                    <DialogTitle id="form-dialog-title">Gönderilen İstekler</DialogTitle>

                                                    <DialogContent>

                                                    {
                                                        listOffersSent.length === 0 ? 
                                                        <DialogContentText>
                                                            Gönderilen bir isteğiniz bulunmuyor.
                                                        </DialogContentText>
                                                        :
                                                        listOffersSent.map((el, i) =>
                                                            <div>
                                                                <DialogContentText key={i}>
                                                                    {el.description}
                                                                </DialogContentText>
                                                                <DialogActions>
                                                                    <Button onClick={(el) => handleDeleteOfferButtonClick(i)}
                                                                            color="danger">
                                                                        Sil
                                                                    </Button>
                                                                </DialogActions>
                                                            </div>
                                                        )
                                                    }
                                                    
                                                    </DialogContent>


                                                    <DialogTitle id="form-dialog-title2">Gelen İstekler</DialogTitle>
                                                    <DialogContent>
                                                        {
                                                            listOffersReceived.length === 0 ?
                                                            <DialogContentText>
                                                                Gelen bir isteğiniz bulunmuyor.
                                                            </DialogContentText>
                                                            :
                                                            listOffersReceived.map((el, i) =>
                                                            <div>
                                                                <DialogContentText key={i}>
                                                                    {el.description}
                                                                </DialogContentText>
                                                                <DialogActions>
                                                                    {listOffersReceived[i].results != "Accepted" &&
                                                                    <Button onClick={(el) => handleRejectOffer(i)}
                                                                            color="danger">
                                                                        {listOffersReceived[i].results == "Rejected" ? "Reddedildi" : "Reddet"}
                                                                    </Button>
                                                                    }
                                                                    {listOffersReceived[i].results != "Rejected" &&
                                                                    <Button onClick={(el) => handleAcceptOffer(i)}
                                                                            color={listOffersReceived[i].results == "Accepted" ? "info" : "success"}>
                                                                        {listOffersReceived[i].results == "Accepted" ? "Kabul Edildi" : "Kabul Et"}
                                                                    </Button>
                                                                    }
                                                                </DialogActions>
                                                            </div>
                                                        )
                                                        }
                                                    </DialogContent>

                                                </Dialog>
                                            </div>
                                            Mesajlarımı görüntüle
                                        </MenuItem>


                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Poppers>
            </div>
            <div className={classes.manager}>

                <Button
                    color={window.innerWidth > 959 ? "transparent" : "white"}
                    justIcon={window.innerWidth > 959}
                    simple={!(window.innerWidth > 959)}
                    aria-owns={openProfile ? "profile-menu-list-grow" : null}
                    aria-haspopup="true"
                    onClick={handleClickProfile}
                    className={classes.buttonLink}
                >
                    <Person className={classes.icons}/>
                    <Hidden mdUp implementation="css">
                        <p className={classes.linkText}>Profile</p>
                    </Hidden>
                </Button>
                <Poppers
                    open={Boolean(openProfile)}
                    anchorEl={openProfile}
                    transition
                    disablePortal
                    className={
                        classNames({[classes.popperClose]: !openProfile}) +
                        " " +
                        classes.popperNav
                    }
                >
                    {({TransitionProps, placement}) => (
                        <Grow
                            {...TransitionProps}
                            id="profile-menu-list-grow"
                            style={{
                                transformOrigin:
                                    placement === "bottom" ? "center top" : "center bottom"
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleCloseProfile}>
                                    <MenuList role="menu">

                                        <MenuItem
                                            onClick={handleCloseProfileAndLogout}
                                            className={classes.dropdownItem}
                                        >
                                            Çıkış Yap
                                        </MenuItem>

                                    </MenuList>
                                </ClickAwayListener>

                            </Paper>
                        </Grow>
                    )}
                </Poppers>
            </div>
        </div>
    );
}

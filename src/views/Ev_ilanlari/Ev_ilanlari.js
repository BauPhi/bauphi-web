import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Icon from "@material-ui/core/Icon";
import background from "assets/img/home.png";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);



export default function Ev_ilanlari_sayfasi() {
  const classes = useStyles();

  const [homes, setHomes] = React.useState([[]]);

  React.useEffect(() => { 
      navigator.geolocation.getCurrentPosition(function(position) {
         const latitude = position.coords.latitude;
         const longitude = position.coords.longitude;
         const params = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ latitude, longitude })
          };
      
        fetch(`https://bauphi-api.herokuapp.com/api/generic/get-close-homes`, params)
        .then((response) => response.json()) 
        .then((data) => {
          var tmp = homes;
          data.homes.forEach(home => {
           tmp = [...tmp, [home.key, home.value.state, home.value.city, home.value.neighbourhood]]
          });
          setHomes(tmp);
         });
        });

        }, []);
  
  return (
  
    <GridContainer>
    <GridItem xs={12} sm={12} md={12}>
    <Card>
      <CardHeader color="warning">
        <h4 className={classes.cardTitleWhite}>Ev İlanlarını Listele<Icon>filter_alt</Icon></h4>
        <p className={classes.cardCategoryWhite}>
        Konum erişiminize izin verdiğiniz takdirde size yakın ev ilanları listelenir.  
        </p>
      </CardHeader>
      <CardBody>
    

        <div style={{ backgroundImage: `url(${background})`,  backgroundRepeat: 'no-repeat', }}>
        <Table
          tableHeaderColor="primary"
          tableHead={["Mesafe", "Şehir", "Semt", "Adres"]}
          tableData={homes}
          /></div>
      </CardBody>
    </Card>
  </GridItem>
  </GridContainer>
 
  );
}

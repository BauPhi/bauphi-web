import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import stylesd from "assets/jss/material-dashboard-react/dropdownStyle.js";
import Icon from "@material-ui/core/Icon";
import background from "assets/img/dog.jpg";

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
const useStylesd = makeStyles(stylesd);

export default function Kayip_evcil_hayvan_ilanlari_sayfasi() {
  const classes = useStyles();
  const classesd = useStylesd();


  const [open, setOpen] = React.useState(null);
  const handleToggle = event => {
    if (open && open.contains(event.target)) {
      setOpen(null);
    } else {
      setOpen(event.currentTarget);
    }
  };

  const handleClose = () => {
    setOpen(null);
  };

  
  const [open1, setOpen1] = React.useState(null);
  const handleToggle1 = event => {
    if (open1 && open1.contains(event.target)) {
      setOpen1(null);
    } else {
      setOpen1(event.currentTarget);
    }
  };

  const handleClose1 = () => {
    setOpen1(null);
  };


  const [open2, setOpen2] = React.useState(null);
  const handleToggle2 = event => {
    if (open2 && open2.contains(event.target)) {
      setOpen2(null);
    } else {
      setOpen2(event.currentTarget);
    }
  };

  const handleClose2 = () => {
    setOpen2(null);
  };

  return (
    
   
      
    <GridContainer>
    
    <GridItem xs={12} sm={12} md={12}>
    <Card>
      <CardHeader color="warning">
        <h4 className={classes.cardTitleWhite}>Kayıp İlanlarını Listele<Icon>filter_alt</Icon></h4>
        <p className={classes.cardCategoryWhite}>
        Kayıp insan/evcil hayvan ilanları listelenir.
        </p>
      </CardHeader>
      <CardBody>
      
        <div style={{ backgroundImage: `url(${background})`,  backgroundRepeat: 'no-repeat', }}>
        <Table
          tableHeaderColor="primary"
          tableHead={["Fotoğraf", "Telefon", "Başlık", "Açıklama", "İnsan/Evcil Hayvan"]}
          tableData={[
            ["bılıkbılık", "Ankara", "Yenimahalle"],
            ["gdgd", "Csfa", "df"],
            ["gdgd", "Csfa", "df"],
            ["gdgd", "Csfa", "df"],
            ["gdgd", "Csfa", "df"],
            ["gdgd", "Csfa", "df"],
            ["gdgd", "Csfa", "df"],
    
 

          ]}
        /></div>
      </CardBody>
    </Card>
  </GridItem>
  </GridContainer>
  
  );
}

import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";

export default function MainListItems({setCurrentPage}){
 return <div>
 <ListItem button onClick= {()=>setCurrentPage(0)}>
   <ListItemIcon>
     <DashboardIcon />
   </ListItemIcon>
   <ListItemText primary="Dashboard" />
 </ListItem>
 <ListItem button onClick= {()=>setCurrentPage(1)}>
   <ListItemIcon>
     <BarChartIcon />
   </ListItemIcon>
   <ListItemText primary="Vendors" />
 </ListItem>
 <ListItem button>
   <ListItemIcon>
     <ShoppingCartIcon />
   </ListItemIcon>
   <ListItemText primary="Orders" />
 </ListItem>
 <ListItem button>
   <ListItemIcon>
     <PeopleIcon />
   </ListItemIcon>
   <ListItemText primary="Customers" />
 </ListItem>
 <ListItem button>
   <ListItemIcon>
     <BarChartIcon />
   </ListItemIcon>
   <ListItemText primary="Reports" />
 </ListItem>
 <ListItem button component="a" href="/materialmanager">
   <ListItemIcon>
     <LayersIcon />
   </ListItemIcon>
   <ListItemText primary="Parts and Materials" />
 </ListItem>
</div>

}
  




import React from "react";
import { Pane, Button, Heading, Link, Popover, Menu } from "evergreen-ui";
import {Drawer, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";

import HomeIcon from "@material-ui/icons/Home";

const css = `

.drawerLeft {
    width: '240px'
}
`

const VerticalNavbar = () => {
  return (
    <Drawer className="drawerLeft" variant = "persistent"
    anchor ="left"
    open={true}>
        <List>
            <ListItem>
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
            </ListItem>
        </List>
    </Drawer>
  );
};

export default VerticalNavbar;

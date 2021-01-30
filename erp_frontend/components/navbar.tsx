import React from "react";
import { Pane, Button, Heading, Link, Popover, Menu } from "evergreen-ui";

const Navbar = () => {
  return (
    <>
      <Pane display="flex" padding={16} background="tint2" borderRadius={3}>
        <Pane flex={1} alignItems="center" display="flex">
          <Heading size={600}>Adrenaline ERP</Heading>
        </Pane>
        <Pane>
          <Button marginRight={16}>
            <Link href="/Loc1" color="neutral">
              Location One
            </Link>
          </Button>
          <Button marginRight={16}>
            <Link href="/Loc1" color="neutral">
              Location Two
            </Link>
          </Button>
          <Button marginRight={16}>
            <Link href="/Loc1" color="neutral">
              Location Three
            </Link>
          </Button>
        </Pane>
      </Pane>
    </>
  );
};

export default Navbar;

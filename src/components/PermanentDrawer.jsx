import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddBoxIcon from '@material-ui/icons/AddBox';
import TocIcon from '@material-ui/icons/Toc';
import ListItemText from '@material-ui/core/ListItemText';

import menuOptions from '../menuOptions';

const iconMap = {
  addBoxIcon: () => <AddBoxIcon />,
  tocIcon: () => <TocIcon /> 
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

export default function PermanentDrawer({selected = 0, onClick, children}) {
  const classes = useStyles();

  useEffect(()=> {
    console.log('PermanentDrawer', selected);
    
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);

  },[selected])

  const handleClick = (event, index) => {

    event.preventDefault();
    window.history.pushState({},'', menuOptions[index].value);
    
    onClick(index);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            {menuOptions[selected].title}
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer className={classes.drawer} variant="permanent" classes={{ paper: classes.drawerPaper, }} anchor="left" >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {menuOptions.map((item, index) => (
            <ListItem onClick={(event) => handleClick(event, index)} button key={item.id}>
              <ListItemIcon>{iconMap[item.icon]()}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}

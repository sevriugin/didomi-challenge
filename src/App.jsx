import React, {useState, useEffect} from 'react';
import ShowConsents from './pages/ShowConsents';
import GiveConsent from './pages/GiveConsent';
import PermanentDrawer from './components/PermanentDrawer';
import { makeStyles } from '@material-ui/core/styles';
import Route from './components/Route';
import menuOptions from './menuOptions';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
  }));

const App = () => {
    const [selected, setSelected] = useState(0);
    const classes = useStyles();

    useEffect(() => {
        console.log('App', window.location.pathname);

        const index = menuOptions.findIndex(item => window.location.pathname === item.value);
        console.log('App', index);
        if (index >= 0) {
            setSelected(index);
        } else {
            setSelected(0);
            window.history.pushState({},'', menuOptions[0].value);
            
            const navEvent = new PopStateEvent('popstate');
            window.dispatchEvent(navEvent);
        }
       
    }, [])


    return (
        <div>
            <PermanentDrawer selected={selected} onClick={setSelected} />
            <main className={classes.content}>
                <div className={classes.toolbar} />

                <Route path={menuOptions[0].value}>
                    <GiveConsent  />
                </Route>

                <Route path={menuOptions[1].value}>
                    <ShowConsents />
                </Route>
                
            </main>
        </div>
    );
};

export default App;
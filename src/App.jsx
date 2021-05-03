import React, {useState} from 'react';
import ShowConsents from './pages/ShowConsents';
import GiveConsent from './pages/GiveConsent';
import PermanentDrawer from './components/PermanentDrawer';

const App = () => {
    const [selected, setSelected] = useState(0);

    return (
        <div>
            <PermanentDrawer selected={selected} onClick={setSelected}>
                <GiveConsent />
                <ShowConsents />
            </PermanentDrawer>
        </div>
    );
};

export default App;
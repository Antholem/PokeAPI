import React, { useEffect, useState, Fragment } from 'react';
import useStore from '../Store';
import axios from 'axios';

function Settings() {
    const { mode } = useStore();

    return (
        <Fragment>
            Settings
        </Fragment>
    );
}

export default Settings;

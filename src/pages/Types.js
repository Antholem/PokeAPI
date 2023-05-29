import React, { useEffect, useState, Fragment } from 'react';
import useStore from '../Store';
import axios from 'axios';

function Types() {
    const { mode } = useStore();

    return (
        <Fragment>
            Types
        </Fragment>
    );
}

export default Types;

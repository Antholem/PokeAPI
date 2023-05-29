import React, { useEffect, useState, Fragment } from 'react';
import useStore from '../Store';
import axios from 'axios';

function Favorites() {
    const { mode } = useStore();

    return (
        <Fragment>
            Favorites
        </Fragment>
    );
}

export default Favorites;

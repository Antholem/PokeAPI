import React, { useEffect, useState, Fragment } from 'react';
import useStore from '../Store';
import axios from 'axios';

function TeamBuilder() {
    const { mode } = useStore();

    return (
        <Fragment>
            Team Builder
        </Fragment>
    );
}

export default TeamBuilder;

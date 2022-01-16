import React, { useEffect } from 'react';

import * as serviceWorkerRegistration from '../../serviceWorkerRegistration';
import * as serviceWorkerSubscription from '../../serviceWorkerSubscription';

import "./_homepage.scss";

const Homepage = () => {
    useEffect(() => {
        async function registerAndSubscribeUser() {
            serviceWorkerRegistration.register();
            return await serviceWorkerSubscription.subscribeUser();
        }
        registerAndSubscribeUser()
            .then((pushSubscription) => console.log('User is subscribed with ', pushSubscription))
            .catch((err) => console.log(err));
    }, [])
    return <div />
}

export default Homepage;

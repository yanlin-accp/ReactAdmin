import React from 'react';
import { Redirect } from 'react-router-dom';
import MemoryUntils from '../../untils/memoryUntils';

function Admin(props) {

    const user=MemoryUntils.user;
    if(!user || !user._id){
       return <Redirect to="/login"/>
    }
    return (
        <div>
            hello{user.username}
        </div>
    );
}

export default Admin;
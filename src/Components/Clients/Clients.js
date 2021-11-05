import React, {useEffect} from "react";
import {useSelector} from "react-redux";

export const Clients = () => {
    const clients  = useSelector(state => state.clients)
    console.log(clients)
    useEffect( () => {

    }, [clients])

    return (
        <div>
            {}
        </div>
    )
}
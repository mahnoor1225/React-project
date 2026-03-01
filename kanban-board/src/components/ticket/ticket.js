import React from "react";
import './ticket.css'
import { MoreHorizontal } from "react-feather";
import Status from "../status/status";

function Ticket()
{
    return (
        <div className='ticket'>
            <div className='ticket_top'>
                <div className="cardLabel">
                    <Status text='to do'/>
                </div>
                <MoreHorizontal />
            </div>

        </div>
    )
}

export default Ticket;
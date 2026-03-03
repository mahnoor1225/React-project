import React from "react";
import './ticket.css'
import { CheckSquare, Clock, MoreHorizontal } from "react-feather";
import Status from "../status/status";

function Ticket()
{
    return (
        <div className='ticket'>
            <div className='ticket_top'>
                <div className="ticketLabel">
                    <Status text='to do'/>
                </div>
                <MoreHorizontal />
            </div>
            <div className="title">FRONTEND
            </div>
            <div className="description">
                <p>this is the description</p>
            </div>
            <div className="footer">end
                <p><Clock /> 29 sep</p>
                <p><CheckSquare />1/4</p>
            </div>
        </div>
    )
}

export default Ticket;
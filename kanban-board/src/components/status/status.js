import React from "react";
import './status.css'
import { X } from "react-feather";

function Status (props) {
    return(
        <div className ='chip' style={{backgroundColor:props.color}}>
            {props.text}
            {props.close && <X onClick={props.onclose ? props.onClose(): ""}/>}
        </div>
    )
}

export default Status;
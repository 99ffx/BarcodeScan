import React from "react";
//import pic from "./Picture/pallet.jpg";
//import axios from 'axios';

function Popup(props) {
    return(props.trigger) ? (
        <div className="popup-box">
            {/* <img src={pic} alt="img1" className="popup-img" /> */}
            <div className="box">
                {/* <button className="close-icon" onClick={() => props.setTrigger(false)}>x</button> */}
                <button className="form-input-btn2" onClick={() => props.setTrigger(false)}>ข้อมูลถูกต้อง</button>
                
                {props.children}
            </div>

        </div>
    ) : "";
};



export default Popup;
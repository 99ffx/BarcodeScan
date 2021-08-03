import React, {useState} from 'react';
import img1 from "./Picture/registered.png";
import "./App.css";
//import { object } from 'prop-types';
import axios from 'axios';
import {useForm} from "react-hook-form";


const App = () => {
  const url = 'http://localhost:8000/mode/barcode';

  const [barcode, setBarcode] = useState("");
  const [barcodeErr, setBarcodeErr] = useState({});
  const [buttonPopup, setButtonPopup] = useState(false);
  const [editPopup, setEditPopup] = useState(false);
  const [name, setName] = useState("");
  const [amountPallet, setAmountPallet] = useState("");
  const [weight, setWeight] = useState("");
  const [lotNo, setLotNo] = useState("");
  const [effDate, setEffDate] = useState("");
  

  const onSubmit = (e) => {
    
    e.preventDefault();
    
    axios.get(url + "?barcode=" + barcode)
    .then(res => {
        
         if (res.data.status === "Done."){
             console.log(res);
             setButtonPopup(true);
             setName(res.data.name);
             setAmountPallet(res.data.amont_pallet);
             setWeight(res.data.weight_database);
             setLotNo(res.data.lot);
             setEffDate(res.data.eff_date);
         }
         else{
             console.log(res)
             alert("เกิดข้อผิดพลาด โปรดตรวจสอบเลขบาร์โค้ดอีกครั้ง");
            
         }
        })
      

    const isValid = formValidation();
    if(isValid === true){
      // refresh after sent data completely
      setBarcode("");
    }
  }

  const formValidation = () => {
    const barcodeErr = {};
    let isValid = true;

    if (barcode.length < 13 || barcode.length > 13 && !Number(barcode) ) {
      barcodeErr.barcodeShort = "โปรดกรอกเลขบาร์โค้ดให้ถูกต้อง";
      isValid = false;
    }


    setBarcodeErr(barcodeErr);
    return isValid;
  }



  
  function Popup(props) {
    const handleReject = (e) => {
      e.preventDefault();
      
  
      const data = {
        "Barcode": barcode,
        "name" : "",
        "weight_database": "",
        "amount_pallet": "",
        "status": "Reject"
       }
        
      axios.get(`http://localhost:8000/mode/reject?barcode=${barcode}`)
      .then(res => 
        console.log(data));
         alert("รอตรวจสอบจากฝ่ายผลิต")
        props.setTrigger(false);
        
    }
    

    return(props.trigger) ? (
        <div className="popup-box">
            <div className="box">
                {/* <button className="close-icon" onClick={() => handleReset}>x</button> */}
                <button className="form-input-btn2" onClick={() => props.setTrigger(false)}>ข้อมูลถูกต้อง</button>
                <button className="form-input-btn1" onClick={handleReject}>แก้ไขข้อมูลสินค้า</button>
                {props.children}
            </div>
  
        </div>
    ) : "";
  };
  
  return (
    
    <div class="container" id="container">
      <div class="form-container input-container">
          {/* <img src={img1} alt="img1" width="100" height="100" /> */}
          <h1>โปรดกรอกเลข Transaction</h1>
          <form onSubmit={onSubmit}>
        <input
              className='form-input'
              type="text"
              name="barcode"
              value={barcode === "" ? barcode : undefined}
              onChange={(e)=>setBarcode(e.target.value)}
              placeholder="Transaction Number"
              id="barcode" 
              />
              <br/>
              {Object.keys(barcodeErr).map((key) => {
                return <div style={{color : "red"}}>{barcodeErr[key]}</div>
              })}
              <button className="form-input-btn" type="submit">
              ส่งข้อมูล
              </button> 
              {buttonPopup && <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
              <p>ข้อมูลสินค้า</p>
              ชื่อสินค้า: {name}<br />
              จำนวนสินค้า: {amountPallet}<br />
              น้ำหนักรวม: {weight}<br />
              Lot No. : {lotNo}<br />
              วันที่ผลิต: {effDate}<br /><br /><br />
              </Popup>} 
            </form>
        </div>
        <div class="overlay-container">
		{/* <div class="overlay">
			<div class="overlay-panel overlay-left">
				<h1>ATACO</h1>
        <h2>SMART</h2>
        <h2>WAREHOUSE</h2>
			</div>
		</div> */}
	</div>
    </div>

    
  )
}

export default App;
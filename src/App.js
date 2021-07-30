import React, {useState} from 'react';
import img1 from "./Picture/123.png";
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

// function EditData() {
//     const {handleSubmit, register} = useForm();

//     // const onSubmit = (data) => {
//     //     console.log(data);
//     // }
//     return(
//       <form onSubmit={handleSubmit(onSubmit)}>
//            <label htmlFor="barcode" className="form-label">
//             แก้ไขข้อมูลสินค้า
//           </label>
//           <input type="text" placeholder="กรุณาใส่ชื่อสินค้า" name="name" ref={register} />
//           <input type="text" placeholder="กรุณาใส่จำนวนสินค้า" name="amount_pallet" ref={register} />
//           <input type="text" placeholder="กรุณาใส่น้ำหนักสินค้ารวม" name="weight_database" ref={register} />
//           <button className="form-input-btn" type="submit">
//           บันทึกข้อมูล
//   </button>  
//       </form>
//   )
//   }

function Popup2(props) {
  const {handleSubmit} = useForm();

  const onSubmit = (data) => {
      console.log(data);
  }
  const handleEdit = (e) => {
    e.preventDefault();
    

    const data = {
      "Barcode": barcode,
      "name" : "",
      "weight_database": "",
      "amount_pallet": "",
      "status": "Reject"
     }
      
    // axios.get(`http://localhost:8000/mode/reject?barcode=${barcode}`)
    // .then(res => 
    //   console.log(data));
    //   // alert("รอตรวจสอบจากฝ่ายผลิต")
    //   props.setTrigger(false);
      
  }
  

  return(props.trigger) ? (
      <div className="popup-box">
          <div className="box">
          <form onSubmit={handleSubmit(onSubmit)}>
             <label htmlFor="barcode" className="form-label">
              แก้ไขข้อมูลสินค้า
            </label>
            <input type="text" placeholder="กรุณาใส่ชื่อสินค้า" name="name" />
            <input type="text" placeholder="กรุณาใส่จำนวนสินค้า" name="amount_pallet" />
            <input type="text" placeholder="กรุณาใส่น้ำหนักสินค้ารวม" name="weight_database" />
            <button className="form-input-btn" type="submit">
            บันทึกข้อมูล
    </button>  
        </form>
              {/* <button className="close-icon" onClick={() => handleReset}>x</button> */}
              <button className="form-input-btn2" onClick={() => props.setTrigger(false)}>ข้อมูลถูกต้อง</button>
              <button className="form-input-btn1" onClick={handleEdit}>แก้ไขข้อมูลสินค้า</button>
              {props.children}
          </div>

      </div>
  ) : "";
};
  
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
        
      // axios.get(`http://localhost:8000/mode/reject?barcode=${barcode}`)
      // .then(res => 
      //   console.log(data));
      //   // alert("รอตรวจสอบจากฝ่ายผลิต")
      //   props.setTrigger(false);
        
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
    <div>
        <div className="form-img">
          <img src={img1} alt="img1" />
          <h1>โปรดแสกนบาร์โค้ด</h1>
          <br />
    </div>
    <form onSubmit={onSubmit}>
    <div className="form-input1">
            <label htmlFor="barcode" className="form-label">
              Barcode ID
            </label>
            <br />
            <input
              className='form-input'
              type="text"
              name="barcode"
              value={barcode === "" ? barcode : undefined}
              onChange={(e)=>setBarcode(e.target.value)}
              placeholder="โปรดกรอกเลขบาร์โค้ด"
              id="barcode" 
              />
              <br/>
              {Object.keys(barcodeErr).map((key) => {
                return <div style={{color : "red"}}>{barcodeErr[key]}</div>
              })}
             
    </div>  
    <button className="form-input-btn" type="submit">
            ส่งข้อมูล
    </button>  
    {/* <Popup trigger={buttonPopup} setTrigger={setbuttonPopup}>something</Popup> */}

    {editPopup && <Popup2 trigger={editPopup} setTrigger={setEditPopup}>
      </Popup2>}

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
  )
}

export default App;
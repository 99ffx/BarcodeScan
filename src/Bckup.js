import React, {useState} from 'react';
//import img1 from "./Picture/registered.png";
import "./App.css";
//import { object } from 'prop-types';
import axios from 'axios';
import {useForm} from "react-hook-form";


const App = () => {
  const url = 'http://localhost:8000/mode/transacno';
  const [editPopup, setEditPopup] = useState(false);
  const [transacno, setTransacNo] = useState("");
  const [transacnoErr, setTransacNoErr] = useState({});
  const [buttonPopup, setButtonPopup] = useState(false);
  const [name, setName] = useState("");
  const [SKUNo, setSKUNo] = useState("");
  const [amountPallet, setAmountPallet] = useState("");
  const [weight, setWeight] = useState("");
  const [lotNo, setLotNo] = useState("");
  const [effDate, setEffDate] = useState("");


  function Popup2(props) {
    const {handleSubmit} = useForm();
  
    const [isEdit, setIsEdit] = useState(false)
  
    const onSubmit = (data) => {
        console.log(data);
    }
    // const handleEdit = (e) => {
    //   e.preventDefault();
        
    //   // axios.get(`http://localhost:8000/mode/reject?barcode=${barcode}`)
    //   // .then(res => 
    //   //   console.log(data));
    //   //   // alert("รอตรวจสอบจากฝ่ายผลิต")
    //   //   props.setTrigger(false);
        
    // }
  
    return (props.trigger) ? (
        <div className="popup-box">
            <div className="box">
              <form className='form-wrapper' onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="barcode" className="form-label">
                  ข้อมูลสินค้า
                </label>
                
                <div>
                  <span>ชื่อสินค้า: </span>
                <input type="text" placeholder="กรุณาใส่ชื่อสินค้า"  name="name" value={name} disabled={!isEdit}/>
                </div>
  
                <div>
                  <span>จำนวนสินค้า: </span>
                <input type="text" placeholder="กรุณาใส่จำนวนสินค้า" name="amount_pallet" value={amountPallet} disabled={!isEdit}/>
                </div>

                <div>
                  <span>น้ำหนักรวม: </span>
                <input type="text" placeholder="กรุณาใส่น้ำหนักสินค้ารวม" name="weight_database" value={weight} disabled={!isEdit}/>
                </div>

                <div>
                  <span>SKU No.: </span>
                <input type="text" name="SKU_No" value={SKUNo} disabled/>
                </div>
  
                <div>
                  <span>Lot No.: </span>
                <input type="text" value={lotNo} name="lot_no" disabled />
                </div>
  
                <div>
                  <span>วันที่ผลิต: </span>
                <input type="text" name="created_date" value={effDate} disabled/>
                </div>

                {isEdit? <button className="form-input-btn-submit">บันทึกข้อมูล</button>:
                <div>
                  <br />
                  <button type="button" onClick={()=>setIsEdit(true)} className="form-input-btn1" >แก้ไขข้อมูลสินค้า</button>
                  <button className="form-input-btn2" onClick={() => props.setTrigger(false)} >ข้อมูลถูกต้อง</button>
                  {props.children}
                </div>}
              </form>
              </div>
        </div>
    ): "";
  };
  

  const onSubmit = (e) => {
    
    e.preventDefault();
    
    axios.get(url + "?transacno=" + transacno)
    .then(res => {
        
         if (res.data.status === "Done."){
             console.log(res);
             setButtonPopup(true);
             setName(res.data.name);
             setSKUNo(res.data.soitem);
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
      setTransacNo("");
    }
  }

  const formValidation = () => {
    const transacnoErr = {};
    let isValid = true;

    if (transacno.length < 13 || transacno.length > 13 && !Number(transacno) ) {
      transacnoErr.transacnoShort = "โปรดกรอกเลขบาร์โค้ดให้ถูกต้อง";
      isValid = false;
    }

    setTransacNoErr(transacnoErr);
    return isValid;
  }


  function Popup(props) {
    const handleReject = (e) => {
      e.preventDefault();
      
      const data = {
        "transacno": transacno,
        "name" : "",
        "SKU No.": "",
        "weight_database": "",
        "amount_pallet": "",
        "status": "Reject"
       }
        
      axios.get(`http://localhost:8000/mode/reject?transacno=${transacno}`)
      .then(res => 
        console.log(data));
         alert("รอตรวจสอบจากฝ่ายผลิต")
        props.setTrigger(false);
        
    }
    

    // return(props.trigger) ? (
    //     <div className="popup-box">
    //         <div className="box">
    //             {/* <button className="close-icon" onClick={() => handleReset}>x</button> */}
    //             <button className="form-input-btn2" onClick={() => props.setTrigger(false)}>ข้อมูลถูกต้อง</button>
    //         
    //             {props.children}
    //         </div>
  
    //     </div>
    // ) : "";
  };
  
  return (
    
    <div class="container" id="container">
      <div class="form-container input-container">
          <h1>โปรดกรอกเลข Transaction</h1>
          <form onSubmit={onSubmit}>
        <input
              className='form-input'
              type="text"
              name="transacno"
              value={transacno === "" ? transacno : undefined}
              onChange={(e)=>setTransacNo(e.target.value)}
              placeholder="Transaction Number"
              id="transacno" 
              />
              <br/>
              {Object.keys(transacnoErr).map((key) => {
                return <div style={{color : "red"}}>{transacnoErr[key]}</div>
              })}
              <button className="form-input-btn" type="submit">
              ส่งข้อมูล
              </button> 

              {!editPopup && <Popup2 trigger={!editPopup} setTrigger={setEditPopup}>
               </Popup2>}
{/* 
              {buttonPopup && <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
              <p>ข้อมูลสินค้า</p>
              ชื่อสินค้า: {name}<br />
              SKU No.: {SKUNo} <br />
              จำนวนสินค้า: {amountPallet}<br />
              น้ำหนักรวม: {weight}<br />
              Lot No. : {lotNo}<br />
              วันที่ผลิต: {effDate}<br /><br /><br />
              </Popup>}  */}

            </form>
        </div>
        <div>
	</div>
    </div>

    
  )
}

export default App;
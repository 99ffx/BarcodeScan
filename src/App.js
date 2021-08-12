import React, { useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const url = "http://localhost:8000/mode/transacno";

  const [transacno, setTransacno] = useState("");
  const [transacnoErr, setTransacnoErr] = useState({});
  const [buttonPopup, setButtonPopup] = useState(false);
  // const [editPopup, setEditPopup] = useState(false);
  const [name, setName] = useState("");
  const [amountPallet, setAmountPallet] = useState("");
  const [weight, setWeight] = useState("");
  const [lotNo, setLotNo] = useState("");
  const [effDate, setEffDate] = useState("");
  const [SKUNo, setSKUNo] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    axios.get(url + "?transacno=" + transacno).then((res) => {
      if (res.data.status === "Done.") {
        setButtonPopup(true);
        setName(res.data.name);
        setSKUNo(res.data.soitem);
        setAmountPallet(res.data.amont_pallet);
        setWeight(res.data.weight_database);
        setLotNo(res.data.lot);
        setEffDate(res.data.eff_date);
      } else {
        alert("เกิดข้อผิดพลาด โปรดตรวจสอบเลขบาร์โค้ดอีกครั้ง");
      }
    });

    const isValid = formValidation();
    if (isValid === true) {
      // refresh after sent data completely
      // setTransacno("");
    }
  };

  const formValidation = () => {
    const transacnoErr = {};
    let isValid = true;

    if (
      transacno.length < 13 ||
      (transacno.length > 13 && !Number(transacno))
    ) {
      transacnoErr.transacnoShort = "โปรดกรอกเลขบาร์โค้ดให้ถูกต้อง";
      isValid = false;
    }

    setTransacnoErr(transacnoErr);
    return isValid;
  };

  function Popup(props) {
    const onClose = () => {
      props.setTrigger(false);
      setTransacno("");
    };

    const handleReject = (e) => {
      e.preventDefault();
      setIsEdit(false);

      const data = {
        transacno: transacno,
        // name: name,
        // weight_database: weight,
        // amount_pallet: amountPallet,
        SKU_no: localStorage.getItem("lot_no"),
        //weight_database: localStorage.getItem("weight_database"),
        amount_pallet: localStorage.getItem("amount_pallet"),
        // status: "Reject",
      };

      axios
        .get(`http://localhost:8000/mode/reject?transacno=${transacno}`, data)
        .then(() => {
          console.log(data);
          //localStorage.removeItem("name_product");
          //localStorage.removeItem("weight_database");
          localStorage.removeItem("amount_pallet");
          localStorage.removeItem("lot_no");
        });
      onClose();
    };

    return props.trigger ? (
      <div className="popup-box">
        <div className="box">
          {!isEdit && (
            <button className="form-input-btn2" onClick={() => onClose()}>
              ข้อมูลถูกต้อง
            </button>
          )}
          {!isEdit && (
            <button className="form-input-btn1" onClick={() => setIsEdit(true)}>
              แก้ไขข้อมูลสินค้า
            </button>
          )}
          {isEdit && (
            <button className="form-input-btn2" onClick={handleReject}>
              บันทึกผล
            </button>
          )}
          {isEdit && (
            <button
              className="form-input-btn1"
              onClick={() => setIsEdit(false)}
            >
              ยกเลิก
            </button>
          )}
          {props.children}
        </div>
      </div>
    ) : (
      ""
    );
  }

  return (
    <div className="container" id="container">
      <div className="form-container input-container">
        <h1>โปรดกรอกเลข Transaction</h1>
        <form onSubmit={onSubmit}>
          <input
            className="form-input"
            type="text"
            name="transacno"
            value={transacno === "" ? transacno : undefined}
            onChange={(e) => setTransacno(e.target.value)}
            placeholder="Transaction Number"
            id="transacno"
          />
          <br />
          {Object.keys(transacnoErr).map((key, index) => {
            return (
              <div key={index} style={{ color: "red" }}>
                {transacnoErr[key]}
              </div>
            );
          })}
          <button className="form-input-btn" type="submit">
            ส่งข้อมูล
          </button>
          {/* {buttonPopup && <Popup trigger={buttonPopup} setTrigger={setButtonPopup}> */}
          {buttonPopup && (
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
              <p>ข้อมูลสินค้า</p>
              <div>
                <span>ชื่อสินค้า: </span>
                <input
                  type="text"
                  name="name_product"
                  defaultValue={name}
                  disabled
                />
              </div>
              <div>
                {/* <p>{name}</p> */}
                <span>SKU No.:</span>
                <input
                  type="text"
                  placeholder="กรุณากรอกเลข SKU"
                  name="lot_no"
                  defaultValue={SKUNo}
                  onChange={(e) =>
                     localStorage.setItem("lot_no", e.target.value)
                  }
                  disabled={!isEdit}
                />
              </div>
              <div>
                <span>จำนวนสินค้า: </span>
                <input
                  type="text"
                  placeholder="กรุณาใส่จำนวนสินค้า"
                  name="amount_pallet"
                  defaultValue={amountPallet}
                  onChange={(e) =>
                    localStorage.setItem("amount_pallet", e.target.value)
                  }
                  disabled={!isEdit}
                />
              </div>
              <div>
                <span>น้ำหนักรวม: </span>
                <input
                  type="text"
                  placeholder="กรุณาใส่น้ำหนักสินค้ารวม"
                  name="weight_database"
                  defaultValue={weight}
                  onChange={(e) =>
                    localStorage.setItem("weight_database", e.target.value)
                  }
                  disabled
                />
              </div>
              <div>
                <span>Lot No.: </span>
                <input
                  type="text"
                  defaultValue={lotNo}
                  name="lot_no"
                  disabled
                />
              </div>
              <div>
                <span>วันที่ผลิต: </span>
                <input
                  type="text"
                  name="created_date"
                  defaultValue={effDate}
                  disabled
                />
              </div>
            </Popup>
          )}
        </form>
      </div>
    </div>
  );
};

export default App;

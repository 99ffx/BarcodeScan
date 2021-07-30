import axios from 'axios';
//import React from "react";
//import React, { useState, useEffect } from 'react';
import "./App.css";
import img1 from "./Picture/123.png";


//http://localhost:8000/mode/barcode?barcode=1000202210514&amount=300


class BarcodeForm extends React.Component {
  constructor() {
    super();
    this.state = {
      input: {},
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

// const [errors, setErrors] = useState({});
// const [isSubmitting, setIsSubmitting] = useState(false);

// const [input, setinput] = useState({
//   barcode: '',
//   amount: '',
// });

// const handleChange = e => {
//   const { name, value } = e.target;
//   setinput({
//     ...input,
//     [name]: value
//   });
// };

  handleChange(event) {
    let input = this.state.input;
    input[event.target.name] = event.target.value;

    this.setState({
      input,
    });
  }

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   const url = 'http://localhost:8000/mode/barcode';


  //   setErrors(validate(input));
  //   setIsSubmitting(true);
  // };


  handleSubmit(event) {
    
    event.preventDefault();
    const url = 'http://localhost:8000/mode/barcode';


    if (this.validate()) {
        let input = this.state.input;

    //   console.log(this.state);
    //   console.log(input.barcode)
    //   //let input = {};
    //   input["barcode"] = "";
    //   input["amount"] = "";
    //   this.setState({ input: input });

      console.log(input.barcode)
      console.log(input.amount)

      axios.get(url + "?barcode=" + input.barcode + "&amount=" + input.amount)
.then(res => {
    console.log(res)
     if (res.data === "Done."){
         console.log(res)
         alert("บันทึกข้อมูลเสร็จสิ้น");
     }
     else{
         console.log(res)
         alert("เกิดข้อผิดพลาด โปรดตรวจสอบเลขบาร์โค้ดอีกครั้ง");
     }
})

      //alert("ลงทะเบียนสำเร็จ");
    }

    
  }

  validate() {
    let input = this.state.input;
    let errors = {};
    let isValid = true;

    if (!input.barcode) {
      isValid = false;
      errors.barcode = "โปรดกรอกเลขบาร์โค้ด";
    }

    if (!Number(input.barcode)) {
        isValid = false;
      errors.barcode = "โปรดกรอกเลขบาร์โค้ดให้ถูกต้อง";
    }

    if (!input.amount) {
      isValid = false;
      errors.amount = "โปรดกรอกจำนวนสินค้า";
    }

    if (!Number(input.amount)) {
        isValid = false;
      errors.amount = "โปรดกรอกจำนวนสินค้าให้ถูกต้อง";
    }

    this.setState({
      errors: errors,
    });

    return isValid;
  }

  render() {
    return (
      <div>
        <div className="form-img">
          <img src={img1} alt="img1" />
          <h1>โปรดแสกนบาร์โค้ด</h1>
          <br />
        </div>

        <form onSubmit={this.handleSubmit}>
          <div className="form-input1">
            <label htmlFor="barcode" className="form-label">
              Barcode ID
            </label>
            <br />
            <input
              className='form-input'
              type="text"
              name="barcode"
              value={this.state.input.barcode}
              onChange={this.handleChange}
              placeholder="โปรดกรอกเลขบาร์โค้ด"
              id="barcode"
            />
            <div className="text-danger ">{this.state.errors.barcode}</div>
          </div>
          

          <div className="form-input2">
            <label htmlFor="amount" className="form-label">
              จำนวนสินค้า
            </label>
            <br />
            <input
              className='form-input'
              type="text"
              name="amount"
              value={this.state.input.amount}
              onChange={this.handleChange}
              placeholder="โปรดกรอกจำนวนสินค้า"
              id="amount"
            />
            <div className="text-danger">{this.state.errors.amount}</div>
          </div>
          <br />

          <button className="form-input-btn" type="submit">
            ส่งข้อมูล
          </button>
        </form>
      </div>
    );
  }
}

export default BarcodeForm;

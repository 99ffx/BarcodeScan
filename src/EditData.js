import React from 'react';
import useForm from "react-hook-form";

export default function EditData() {
    const {handleSubmit, register} = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
             <label htmlFor="barcode" className="form-label">
              แก้ไขข้อมูลสินค้า
            </label>
            <input type="text" placeholder="กรุณาใส่ชื่อสินค้า" name="name" ref={register} />
            <input type="text" placeholder="กรุณาใส่จำนวนสินค้า" name="amount_pallet" ref={register} />
            <input type="text" placeholder="กรุณาใส่น้ำหนักสินค้ารวม" name="weight_database" ref={register} />
            <button className="form-input-btn" type="submit">
            บันทึกข้อมูล
    </button>  
        </form>
    )
}
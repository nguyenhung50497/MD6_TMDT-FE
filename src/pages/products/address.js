import axios from "axios";
import { Field, Formik, Form } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDistricts, getProvinces } from "../../service/addressService";

export default function Address() {
   const [province, setProvince] = useState("");
   const [district, setDistrict] = useState("");
   const dispatch = useDispatch();
   const provinces = useSelector((state) => {
      return state.address.provinces;
   });
   const districts = useSelector((state) => {
      return state.address.districts;
   });

   const handleProvince = (value) => {
      for (let i of provinces) {
         if (i.province_name == value) {
            dispatch(getDistricts(i.province_id));
         }
      }
   };
   console.log(province, district);
   useEffect(() => {
      dispatch(getProvinces());
   }, []);
   return (
      <>
         <Formik
            initialValues={{
               provinces: "",
               districts: "",
            }}>
            <Form>
               <Field
                  as="select"
                  name={"province"}
                  onChange={(e) => {
                     handleProvince(e.target.value);
                     setProvince(e.target.value);
                  }}>
                  <option value="">Chọn Tỉnh/Thành Phố</option>
                  {provinces &&
                     provinces.map((item, key) => (
                        <>
                           <option value={item.province_name}>
                              {item.province_name}
                           </option>
                        </>
                     ))}
               </Field>
               <Field
                  as="select"
                  name={"district"}
                  onChange={(e) => {
                     setDistrict(e.target.value);
                  }}>
                  <option value="">Chọn Quận/Huyện</option>
                  {districts &&
                     districts.map((item, key) => (
                        <>
                           <option value={item.district_name}>
                              {item.district_name}
                           </option>
                        </>
                     ))}
               </Field>
            </Form>
         </Formik>
      </>
   );
}

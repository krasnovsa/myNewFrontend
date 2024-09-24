import React, {  useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

function RdsrEditForm({ rdsr, isSubmitted, submitHandler, checkIsValid }) {
  
  const formik = useFormik({
    initialValues: rdsr,
    validationSchema: Yup.object({
      btId: Yup.number()
        .required("Required")
        .positive("Positive"),
        
      resQttFact: Yup.number().required("Required").positive("Positive"),
      
    }),
    onSubmit: (values) =>{
      if (isSubmitted){
        console.log('values', values)
      submitHandler(values, Object.keys(formik.errors).length)
    }
    }
    
  });

  useEffect(() => {
    if (isSubmitted) {
      formik.submitForm();
    }
  }, [isSubmitted]);

  useEffect(() => {
    
    checkIsValid(Object.keys(formik.errors).length);
  });
  useEffect(() => {
    console.log('formik init data ' , rdsr)
     formik.validateForm()
  },[]);

  return (
    <form>
      <div className="form-group">
        <label htmlFor="btId">Tool</label>
        <select
          id="btId"
          name="btId"
          type="number"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.btId}
        >
          <option value="30" active>Pegas</option>
          <option value="31">MACC-1</option>
          <option value="32">MACC-2</option>
          <option value="42">JH-400</option>
        </select>

        {formik.touched.btId && formik.errors.btId ? (
          <div className="alert alert-danger">{formik.errors.btId}</div>
        ) : null}
      </div>

      <div className="form-group">
        <label htmlFor="resQttFact">Fact quantity</label>
        <input
          id="resQttFact"
          name="resQttFact"
          type="number"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.resQttFact}
        />
        {formik.touched.resQttFact && formik.errors.resQttFact ? (
          <div className="alert alert-danger">{formik.errors.resQttFact}</div>
        ) : null}
      </div>

      
    </form>
  );
}

export default RdsrEditForm;

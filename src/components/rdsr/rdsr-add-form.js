import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

function RdsrAddForm({ isSubmitted, submitHandler, checkIsValid }) {
  const formik = useFormik({
    initialValues: { ticketId: 0 },
    validationSchema: Yup.object({
      ticketId: Yup.number().required("Required").positive("Positive"),
    }),
    onSubmit: (values) => {
      if (isSubmitted) {
        console.log("values", values);
        submitHandler(values, Object.keys(formik.errors).length);
      }
    },
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
    formik.validateForm();
  }, []);

  return (
    <form>
      <div className="form-group">
        <label htmlFor="ticketId">Номер этикетки</label>
        <input
          id="ticketId"
          name="ticketId"
          type="number"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.ticketId}
        />
        {formik.touched.ticketId && formik.errors.ticketId ? (
          <div className="alert alert-danger">{formik.errors.ticketId}</div>
        ) : null}
      </div>
    </form>
  );
}

export default RdsrAddForm;

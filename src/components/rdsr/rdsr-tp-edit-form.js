import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

function RdsrTpEditForm({
  tpItem,
  isSubmitted,
  submitHandler,
  checkIsValid,
  restQtt,
  prevLen,
  prevQtt,
}) {
  const formik = useFormik({
    initialValues: tpItem,
    validationSchema: Yup.object({
      qtt: Yup.number()
        .required("Required")
        .positive("Positive")
        .min(1, "Min 1"),
      len: Yup.number().required("Required").positive("Positive"),
      resultType: Yup.number().required("Required"),
      timeOne: Yup.number().required("Required"),
    }),
    onSubmit: (values) =>
      submitHandler(values, Object.keys(formik.errors).length),
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
        <label htmlFor="resultType">Результат операции</label>
        <select
          id="resultType"
          name="resultType"
          type="number"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.resultType}
        >
          <option value="0">Основная заготовка</option>
          <option value="1">Вторичная заготовка</option>
          <option value="2">Отходы</option>
        </select>

        {formik.touched.resultType && formik.errors.resultType ? (
          <div className="alert alert-danger">{formik.errors.resultType}</div>
        ) : null}
      </div>

      <div className="form-group">
        <label htmlFor="len">Длина, мм </label>
        <input
          id="len"
          name="len"
          type="number"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.len}
        />
        {formik.touched.len && formik.errors.len ? (
          <div className="alert alert-danger">{formik.errors.len}</div>
        ) : null}
      </div>

      <div className="form-group">
        <label htmlFor="qtt">
          Количество, шт{" "}
          {`Доступно: ${(((prevLen * prevQtt ))+(restQtt)*1000)/1000} метров.
          (${
            (formik.values.len > 0) &&
            parseInt((((prevLen * prevQtt))+parseInt(restQtt)*1000) /
              formik.values.len)
          } шт.)`}

        </label>
        <input
          id="qtt"
          name="qtt"
          type="number"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.qtt}
        />
        {formik.touched.qtt && formik.errors.qtt ? (
          <div className="alert alert-danger">{formik.errors.qtt}</div>
        ) : null}
      </div>

      <div className="form-group">
        <label htmlFor="timeOne">Время на 1 рез, сек.</label>
        <input
          id="timeOne"
          name="timeOne"
          type="number"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.timeOne}
        />
        {formik.touched.timeOne && formik.errors.timeOne ? (
          <div className="alert alert-danger">{formik.errors.timeOne}</div>
        ) : null}
      </div>
    </form>
  );
}

export default RdsrTpEditForm;

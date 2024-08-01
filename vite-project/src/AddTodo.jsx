import React from "react";
import { useField } from "formik";

function Forms({ label, name, placeholder, type, id, ...rest }) {
  const [field, meta] = useField(name);
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        {...field}
        {...rest}
        type={type}
        placeholder={placeholder}
        className="py-2 px-3 border rounded-md w-full sm:w-[320px]"
      />
      {meta.touched && meta.error && (
        <p className="text-red-500">{meta.error}</p>
      )}
    </div>
  );
}

export default Forms;

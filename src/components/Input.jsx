import React from "react";

export const Input = ({ type, placeholder, value, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
);

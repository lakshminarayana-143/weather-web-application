import React from "react";

export const Button = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
  >
    {children}
  </button>
);

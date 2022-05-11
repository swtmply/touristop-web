import React, { PropsWithChildren } from "react";

const Button: React.FC<
  PropsWithChildren<
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  >
> = ({ children, ...props }) => {
  return (
    <span className="after:block after:absolute after:inset-0 after:bg-black after:-z-10 relative inline-block duration-300">
      <button
        {...props}
        className="bg-white py-2 px-8 border-2 border-black hover:-translate-x-1 hover:-translate-y-1 duration-300 relative"
      >
        {children}
      </button>
    </span>
  );
};

export default Button;

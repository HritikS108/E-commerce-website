import { ButtonProps } from "../TypeDefinations/types";
const Button = ({ children, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className={
        " block w-full bg-black hover:bg-gray-800 text-white font-semibold py-1 px-4 shadow mt-2"
      }
    >
      {children}
    </button>
  );
};
export default Button;

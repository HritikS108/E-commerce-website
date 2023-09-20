import { CardProps } from "../TypeDefinations/types";
const Card = ({ url, children, innerRef }: CardProps) => {
  return (
    <div ref={innerRef} className="mx-2 mt-5 bg-white shadow p-2">
      <img className="block w-full" src={url} alt="Item" />
      {children}
    </div>
  );
};
export default Card;

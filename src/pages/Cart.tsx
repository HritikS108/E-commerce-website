import { useSelector } from "react-redux";
import Button from "../components/Button";
import Card from "../components/Card";
import { modifyElement, removeElement } from "../store";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { MyState } from "../TypeDefinations/types";
import { Link } from "react-router-dom";
const Cart = () => {
  const [cost, setCost] = useState(0);
  const dispatch = useDispatch();
  const { user, cartList } = useSelector((state: MyState) => {
    return { user: state.user, cartList: state.cart };
  });

  useEffect(() => {
    const temp = cartList.reduce((acc, item) => {
      return acc + item.quantity! * item.price!;
    }, 0);
    setCost(temp);
  }, [cartList]);
  if (!user)
    return (
      <div className="w-full text-center">
        You are not authorized to view this page.Login First
      </div>
    );
  const content =
    cartList.length === 0 ? (
      <div className="col-span-full text-center">Add Items To Your Cart</div>
    ) : (
      cartList.map((item, id) => {
        return (
          <div key={id}>
            <Card url={item.url}>
              <div className="text-center bg-gray-400 mt-2 text-white">
                COST ${item.price}
              </div>
              <div className="grid grid-cols-3">
                <Button
                  onClick={() =>
                    dispatch(
                      modifyElement({
                        code: item.productCode,
                        quantity: item.quantity! - 1,
                      })
                    )
                  }
                >
                  -
                </Button>
                <p className="m-auto">{item.quantity}</p>
                <Button
                  onClick={() =>
                    dispatch(
                      modifyElement({
                        code: item.productCode,
                        quantity: item.quantity! + 1,
                      })
                    )
                  }
                >
                  +
                </Button>
              </div>

              <Button onClick={() => dispatch(removeElement(item.productCode))}>
                Remove
              </Button>
              <Link to={`/product/${item.productCode}`} state={item}>
                <Button>View Product</Button>
              </Link>
            </Card>
          </div>
        );
      })
    );
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5">
        {content}
      </div>
      <div className="mx-5 my-10 border-y-8 border-black ">
        <div className="m-auto my-10 w-80">
          <p className="text-center">TOTAL COST : ${cost}</p>
          <Button>Place Order</Button>
        </div>
      </div>
    </div>
  );
};
export default Cart;

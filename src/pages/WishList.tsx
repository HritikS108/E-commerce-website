import { useSelector } from "react-redux";
import { addToCart, MyState, removeFromWishlist } from "../store";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { Item } from "../TypeDefinations/types";
import { useDispatch } from "react-redux";
const WishList = () => {
  const dispatch = useDispatch();
  const { user, wishlist } = useSelector((state: MyState) => {
    return { wishlist: state.wishlist, user: state.user };
  });
  const moveToCart = (item: Item) => {
    dispatch(addToCart(item));
    dispatch(removeFromWishlist(item.code));
  };
  if (!user)
    return (
      <div className="w-full text-center">
        You are not authorized to view this page.Login First
      </div>
    );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5">
      {wishlist.length === 0 ? (
        <div className="col-span-full text-center">
          Add your favourites to this list.
        </div>
      ) : (
        wishlist.map((item, id) => {
          return (
            <div key={id}>
              <Card url={item.url}>
                <div className="text-center bg-gray-400 mt-2 text-white">
                  COST ${item.price}
                </div>

                <Link to={`/product/${item.productCode}`} state={item}>
                  <Button>View Product</Button>
                </Link>
                <Button onClick={() => moveToCart(item)}>Move to Cart</Button>
                <Button onClick={() => dispatch(removeFromWishlist(item.code))}>
                  Remove
                </Button>
              </Card>
            </div>
          );
        })
      )}
    </div>
  );
};

export default WishList;

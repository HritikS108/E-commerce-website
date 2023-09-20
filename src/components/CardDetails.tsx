import { useParams } from "react-router";
import { addToWishlist, useFetchItemDetailsQuery } from "../store";
import { useLocation } from "react-router";
import { addToCart } from "../store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Button from "./Button";
import Skeleton from "./Skeleton";
import ErrorPage from "../pages/ErrorPage";
import { Item, MyState } from "../TypeDefinations/types";
const CardDetails = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: MyState) => state.user);

  const handleAddToCart = () => {
    if (user === null) {
      alert("Please Login First");
      return;
    }
    if (ITEM !== undefined) dispatch(addToCart(ITEM));
  };

  const ITEM: Item | undefined = useLocation().state;
  const id: string = useParams().id!;
  const { data, isFetching, error } = useFetchItemDetailsQuery(id);

  if (!ITEM)
    return (
      <ErrorPage>
        <div>Ivalid Path</div>
      </ErrorPage>
    );
  const { url, price } = ITEM;
  if (isFetching) {
    return (
      <Skeleton
        times={4}
        names={"mx-2 mt-5 bg-zinc-200 shadow p-2 h-64 mx-2 mt-5"}
      />
    );
  } else {
    if (error) {
      console.log(error);
      return <ErrorPage>Error fecthing data</ErrorPage>;
    } else {
      const { name, description } = data!;
      return (
        <div className="m-5 grid grid-cols-3 ">
          <div>
            <img className="h-[800px] w-full" src={url} />
          </div>
          <div className="m-5 col-span-2">
            <div className="mt-5 text-center text-8xl">{name}</div>
            <div className="mt-5 text-center text-5xl">{description}</div>
            <div className="mt-5 text-center text-4xl">COST-${price}</div>
            <Button onClick={handleAddToCart}>Add to Cart</Button>
            <Button onClick={() => dispatch(addToWishlist(ITEM))}>
              Add to Wishlist
            </Button>
          </div>
        </div>
      );
    }
  }
};
export default CardDetails;

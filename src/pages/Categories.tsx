import { Link } from "react-router-dom";
import { useFetchCategoriesQuery } from "../store";
import Skeleton from "../components/Skeleton";
import ErrorPage from "./ErrorPage";
import Button from "../components/Button";
const images = [
  "https://i.ibb.co/cvpntL1/hats.png",
  "https://i.ibb.co/px2tCc3/jackets.png",
  "https://i.ibb.co/0jqHpnp/sneakers.png",
  "https://i.ibb.co/GCCdy8t/womens.png",
  "https://i.ibb.co/R70vBrQ/men.png",
];
const Categories = () => {
  const { data, isFetching, error } = useFetchCategoriesQuery();
  if (isFetching)
    return (
      <div className="grid md:grid-cols-3 grid-cols-1">
        <Skeleton
          times={20}
          names={"mx-2 mt-5 bg-zinc-200 shadow p-2 h-64 mx-2 mt-5"}
        />
      </div>
    );
  else {
    if (error) {
      return <ErrorPage>Error</ErrorPage>;
    } else {
      return (
        <div className="grid md:grid-cols-3 grid-cols-1">
          {data?.map((category, id) => {
            const { tagCodes, CatName } = category;
            const [categoryName] = tagCodes;
            return (
              <div
                className={`grid h-80 col-span-1 m-5 bg-zinc-200 bg-cover justify-items-center`}
                style={{ backgroundImage: `url(${images[id % 5]})` }}
                key={id}
              >
                <Link className="m-auto" to={`/category/${categoryName}`}>
                  <Button>{CatName}</Button>
                </Link>
              </div>
            );
          })}
        </div>
      );
    }
  }
};
export default Categories;

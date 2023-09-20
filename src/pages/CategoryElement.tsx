import { useParams } from "react-router-dom";
import CardList from "../components/CardList";
const CategoryElement = () => {
  const id: string = useParams().id!;
  return (
    <div>
      <CardList category={id} />
    </div>
  );
};
export default CategoryElement;

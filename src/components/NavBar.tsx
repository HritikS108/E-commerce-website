import { useDispatch, useSelector } from "react-redux";
import { Outlet, Link } from "react-router-dom";
import { changeUser } from "../store";
import Button from "./Button";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { MyState } from "../TypeDefinations/types";
import Profile from "./Profile";
const NavBar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: MyState) => {
    return { user: state.user };
  });
  const handleLogout = () => {
    dispatch(changeUser(null));
  };
  let LoggedIn = false;
  if (Boolean(user)) {
    LoggedIn = true;
  }
  let LINKS = [
    { name: "HOME", link: "/" },
    { name: "CATEGORIES", link: "/category" },
  ];
  return (
    <>
      <div className="shadow-md w-full fixed top-0 left-0 bg-gray-400 z-10">
        <div className="md:flex items-center justify-between  py-4 md:px-10 px-7">
          <ul
            className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static  md:z-auto  w-full md:w-auto md:pl-0 pl-9 top-[-490px]}`}
          >
            {LINKS.map(({ name, link }, id) => {
              return (
                <li key={id} className="md:ml-8 text-xl md:my-0 my-7">
                  <Link to={link}>{name}</Link>
                </li>
              );
            })}
          </ul>
          <ul
            className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static  md:z-auto  w-full md:w-auto md:pl-0 pl-9 top-[-490px]}`}
          >
            {LoggedIn && (
              <>
                <Link className="md:text-xl md:my-0 my-7 ml-5" to="/wishlist">
                  <AiOutlineHeart />
                </Link>
                <Profile />
                <Link className="md:text-xl md:my-0 my-7 mx-5" to="/cart">
                  <AiOutlineShoppingCart />
                </Link>
              </>
            )}
            {!LoggedIn && (
              <Link className="md:text-xl md:my-0 my-7 mx-5" to="/login">
                LOGIN
              </Link>
            )}
            {!LoggedIn && (
              <Link className="md:text-xl md:my-0 my-7 mx-5" to="/register">
                REGISTER
              </Link>
            )}
            {LoggedIn && <Button onClick={handleLogout}>LOGOUT</Button>}
          </ul>
        </div>
      </div>
      <div className="mt-20">
        <Outlet />
      </div>
    </>
  );
};
export default NavBar;

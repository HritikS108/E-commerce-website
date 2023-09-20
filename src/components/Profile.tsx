import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { MyState } from "../TypeDefinations/types";
const Profile = () => {
  const [dropdown, setDropdown] = useState(false);
  const divElement = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!divElement.current) {
        return;
      }
      if (!divElement.current.contains(event.target as HTMLElement)) {
        setDropdown(false);
      }
    };
    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler);
  }, []);
  const handleClick = () => {
    setDropdown(!dropdown);
  };
  const { user } = useSelector((state: MyState) => {
    return { user: state.user };
  });
  const { email, photoURL } = user!;
  return (
    <>
      <div ref={divElement} className="ml-5 mt-1 relative">
        <div>
          <button onClick={handleClick}>
            <CgProfile />
          </button>
        </div>
        {dropdown && (
          <div className="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg">
            <div className="py-1 rounded-md bg-white shadow-xs">
              <div className="grid text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out">
                <img className="rounded-full m-auto" src={photoURL} />
                <div className="m-auto text-lg">{email}</div>
                <div className="m-auto"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Profile;

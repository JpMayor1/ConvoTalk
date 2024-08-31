import useMenuState from "../../stores/useMenuState";

const Menu = () => {
  const { isOpen, setIsOpen } = useMenuState((state) => state);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <button
      className="flex flex-col justify-center items-center mt-2"
      onClick={handleClick}
    >
      <span
        className={`bg-white/90 transition-all duration-300 ease-out block h-0.5 w-6 rounded-sm -translate-y-0.5 ${
          !isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
        }`}
      ></span>
      <span
        className={`bg-white/90 transition-all duration-300 ease-out block h-0.5 w-6 rounded-sm m-0.5 ${
          !isOpen ? "opacity-0" : "opacity-100"
        }`}
      ></span>
      <span
        className={`bg-white/90 transition-all duration-300 ease-out block h-0.5 w-6 rounded-sm ${
          !isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
        }`}
      ></span>
    </button>
  );
};

export default Menu;

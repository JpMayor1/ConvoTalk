import useConversation from "../../stores/useConversation";

const SearchInput = () => {
  const { setSearchUser } = useConversation();

  return (
    <input
      type="text"
      placeholder="Search…"
      className="input input-bordered rounded-full"
      onChange={(e) => setSearchUser(e.target.value)}
    />
  );
};

export default SearchInput;

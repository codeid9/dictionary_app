import { useState } from "react";
import { CiSearch } from "react-icons/ci";

function Search({ fetchData }) {
    const [searchText, setSearchText] = useState("");
    return (
        <div className="w-full">
            <div className="flex w-full sm:w-lg md:w-2xl lg:w-4xl mx-auto bg-transparent morph-shadow rounded mt-4">
                <input
                    type="text"
                    placeholder="Enter a word."
                    className="flex-1 text-xl placeholder:text-[16px] placeholder:text-gray-500 px-4 py-2"
                    onChange={(e) => setSearchText(e.target.value)}
                    value={searchText}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && searchText) {
                            fetchData(searchText);
                            setSearchText("");
                        }
                    }}
                />
                <button
                    className="hidden sm:flex w-24 bg-transparent morph-shadow justify-center items-center gap-4 rounded m-1 cursor-pointer active:scale-95"
                    onClick={() => {
                        fetchData(searchText);
                        setSearchText("");
                    }}
                >
                    <span>Search</span>
                    <CiSearch className="text-black text-xl" />
                </button>
            </div>
        </div>
    );
}

export default Search;

import React, {useState} from 'react'
import './SearchBar.css'

export const SearchBar = () => {
    const[query,setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Search for:", query);
    };

return(
    <form className="SearchBar" onSumbit={handleSearch}>
        <input type="text" placeholder="Search..." className="SearchValue" value ={query} onChange={(e) => setQuery(e.target.value)}/>
    </form>
);
};

export default SearchBar
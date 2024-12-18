import "./SearchBar.css";

function SearchBar({ onSearchChange }) {
    const handleInputChange = (event) => {
        onSearchChange(event.target.value);
    };

    return (
        
            <div className="SearchBar">
                <input type="text" className="search-input" placeholder="Search..." onChange={handleInputChange}/>
                <button className="search-button">
                    <i className="fas fa-search"></i>
                </button>
            </div>
        
    );
}

export default SearchBar;


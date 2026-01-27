
import React from 'react';

type SearchPopupProps = {
  isPopup: boolean;
  handlePopup: () => void;
};

const SearchPopup: React.FC<SearchPopupProps> = ({ isPopup, handlePopup }) => {
  return (

    <div className={`search-popup ${isPopup ? "popup-visible" : ""}`}>
        <div className="color-layer"></div>
        <button className="close-search" onClick={handlePopup}><span className="far fa-times fa-fw"></span></button>
        <form method="post" action="/blog">
            <div className="form-group">
                <input type="search" name="search-field" placeholder="Search Here" required />
                <button type="submit"><i className="fas fa-search"></i></button>
            </div>
        </form>
    </div>
  );
};

export default SearchPopup;

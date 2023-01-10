import React, { Fragment } from 'react';
import './SearchBox.css';

export function SearchBox(props) {
    return (
        <Fragment>
            <div id='search-bar'>
                <label htmlFor='search'>  </label>
                <input id='search' onChange={props.handleInput} type="text" placeholder="Search by Name" />
                <a className='search-btn' href='##'>
                    <img src={require("../../images/searchImages/search_icon.png")} alt='search-icon' />
                </a>
            </div>
        </Fragment>
    );
}
export default SearchBox;
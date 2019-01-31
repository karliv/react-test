import React from 'react'

const Search = ({value, onChange, children, onSubmit}) => {
    return(
        <form onSubmit={onSubmit}>
            <input onChange={onChange} value={value} type="text" />
            <button type="submit">
                {children}
            </button>
        </form>
    )
};

export default Search;
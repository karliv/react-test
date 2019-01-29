import React from 'react'

const Search = ({value, onChange, children}) => {
    return(
        <form>
            {children}
            <input onChange={onChange} value={value} type="text" />
        </form>
    )
};

export default Search;
import React from "react";

function SearchForm({ input, onChange, onSubmit, ...props }) {
    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="username">
                Search repositories by Github username: {input}
            </label>
            <input id="username" type="text" onChange={onChange} />
            <button type="submit">Search</button>
        </form>
    );
}

export default SearchForm;
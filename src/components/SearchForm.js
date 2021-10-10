import React from "react";

function SearchForm({ input, handleInput, handleSubmit, ...props }) {
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">
                Search repositories by Github username: {input}
            </label>
            <input id="username" type="text" onChange={handleInput} />
            <button type="submit">Search</button>
        </form>
    );
}

export default SearchForm;
import React from "react";

function RepositoryList(props) {
    return (
        <ul>
            {props.data.repositories ? props.data.repositories.map((k, i) =>
                <li key={i}><a href={k.url}>{k.nameWithOwner}</a></li>
            ) : props.data.errors && props.data.errors.map((k, i) => <li key={i}>
                {k.type} : {k.message}
            </li>)}
        </ul>
    );
}

export default RepositoryList;

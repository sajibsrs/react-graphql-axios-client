import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const axiosGithubGraphQL = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`,
  }
});

const GET_REPOSITORIES = `
  {
    user (login: "sajibsrs") {
      email
      repositories(first: 100) {
        nodes{
          nameWithOwner
        }
      }
    }
  }`;

function App() {
  const [data, setData] = useState({ repositories: null, errors: null });
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState(null);

  useEffect(() => {
    onFetchFromGithub();
  }, []);

  const submit = event => event.preventDefault();

  const onFetchFromGithub = () => {
    axiosGithubGraphQL
      .post('', { query: GET_REPOSITORIES })
      .then(result => {
        setLoading(false);
        console.log(result.data);
        setData({
          repositories: result.data.data.user.repositories.nodes,
          errors: result,
        })
      });
  };

  return (
    <div className="App">
      <h1>Github GraphQL API</h1>
      <form onSubmit={submit}>
        <label htmlFor="url">
          Show repositories for username
        </label>
        <input id="url" type="text" onChange={setInput} style={{ width: '300px' }} />
        <button type="submit">Search</button>
      </form>
      {loading ? <p>loading...</p> :
        <ul>
          {data.repositories && data.repositories.map((k, i) =>
            <li key={i}>{k.nameWithOwner}</li>
          )}
        </ul>
      }
    </div>
  );
}

export default App;

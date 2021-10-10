import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const axiosGithubGraphQL = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`,
  }
});

const GET_ORGANIZATION = `
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

  useEffect(() => {
    onFetchFromGithub();
  }, []);

  const submit = event => event.preventDefault();
  const handleChange = event => {
    setData(event.target.value);
  };

  const onFetchFromGithub = () => {
    axiosGithubGraphQL
      .post('', { query: GET_ORGANIZATION })
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
        <input id="url" type="text" onChange={handleChange} style={{ width: '300px' }} />
        <button type="submit">Search</button>
      </form>
      {loading ? <p>loading...</p> :
        <div>
          {data.repositories && data.repositories.map((k, i) => <p key={i}>{k.nameWithOwner}</p>)}
        </div>
      }
    </div>
  );
}

export default App;

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
          url
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

  console.log(input);

  const handleSubmit = event => {
    event.preventDefault();
    console.log(`Searched username: ${input}`)
  };

  const onFetchFromGithub = () => {
    axiosGithubGraphQL
      .post('', { query: GET_REPOSITORIES })
      .then(result => {
        setLoading(false);
        // console.log(result.data);
        setData({
          repositories: result.data.data.user.repositories.nodes,
          errors: result,
        })
      });
  };

  return (
    <div className="App">
      <h1>Github GraphQL API</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          Search repositories by Github username: {input}
        </label>
        <br />
        <br />
        <input id="username" type="text" onChange={e => setInput(e.target.value)} style={{ width: '300px' }} />
        <button type="submit">Search</button>
      </form>
      {loading ? <p>loading...</p> :
        <ul>
          {data.repositories && data.repositories.map((k, i) =>
            <li key={i}><a href={k.url}>{k.nameWithOwner}</a></li>
          )}
        </ul>
      }
    </div>
  );
}

export default App;

import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SearchForm from './components/SearchForm';
import RepositoryList from './components/RepositoryList';

const axiosGithubGraphQL = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`,
  }
});

const githubRepoQuery = (username, limit = 100) => `
  {
    user (login: "${username}") {
      email
      repositories(first: ${limit}) {
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
  const [submit, setSubmit] = useState("");

  useEffect(() => {
    if (!submit) {
      setLoading(false);
      return;
    };
    setLoading(true);
    onFetchFromGithub(submit);
  }, [submit]);

  const handleSubmit = event => {
    event.preventDefault();
    setSubmit(input);
  };

  const handleInput = event => {
    setInput(event.target.value);
  }

  const onFetchFromGithub = (username) => {
    axiosGithubGraphQL
      .post('', { query: githubRepoQuery(username) })
      .then(result => {
        setLoading(false);
        setData({
          repositories: !result.data.errors ? result.data.data.user.repositories.nodes : null,
          errors: result.data.errors ? result.data.errors : null,
        })
      });
  };

  return (
    <div className="App">
      <h1>Github GraphQL API</h1>
      <SearchForm input={input} onChange={handleInput} onSubmit={handleSubmit} />
      {loading ? <p>loading...</p> : <RepositoryList data={data} />}
    </div>
  );
}

export default App;

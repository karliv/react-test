import React, {Component} from 'react'
import './App.css'
import Search from './components/Search'
import UserList from './components/UserList'
import Button from './components/Button'

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';

const DEFAULT_HPP = '10';
const PARAM_HPP = 'hitsPerPage=';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            results: null,
            searchKey: '',
            searchTerm: 'redux',
            error: null
        }
    };

    needsToSearchTopStories = (searchTerm) => {
        return !this.state.results[searchTerm];
    };

    onDismiss = (id) => {
        const {searchKey, results} = this.state;
        const {hits, page} = results[searchKey];

        const updatedHits = hits.filter((item) => item.objectID !== id);

        this.setState({
            results: {...results, [searchKey]: {hits: updatedHits, page}}
        });
    };

    onSearchChange = (e) => {
        this.setState({searchTerm: e.target.value});
    };

    setSearchTopStories = (result) => {
        const { hits, page } = result;
        const { results, searchKey } = this.state;

        const oldHits = results && results[searchKey]
            ? results[searchKey].hits
            : [];

        const updatedHits = [
            ...oldHits,
            ...hits
        ];

        this.setState({ results: {...results, [searchKey]: {hits: updatedHits, page}} });
    };

    componentDidMount() {
        const {searchTerm} = this.state;
        this.setState({searchKey: searchTerm});
        this.fetchSearchTopStories(searchTerm);
    }

    fetchSearchTopStories = (searchTerm, page = 0) => {
        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
            .then(response => response.json())
            .then(result => this.setSearchTopStories(result))
            .catch(error => this.setState({error}));
    };

    onSearchSubmit = (e) => {
        const {searchTerm} = this.state;
        this.setState({searchKey: searchTerm});

        if (this.needsToSearchTopStories(searchTerm)) {
            this.fetchSearchTopStories(searchTerm);
        }

        e.preventDefault();
    };

    render() {
        const {results, searchTerm, searchKey, error} = this.state;
        const page = (results && results[searchKey] && results[searchKey].page) || 0;
        const list = (results && results[searchKey] && results[searchKey].hits) || [];

        return (
            <div className="page">
                <div className="interactions">
                    <Search value={searchTerm} onChange={this.onSearchChange} onSubmit={this.onSearchSubmit}>Поиск</Search>
                </div>
                {!error ?
                    <UserList list={list} onDismiss={this.onDismiss}/> :
                    <div className="interactions">
                        <p>Что-то произошло не так.</p>
                    </div>
                }
                <div className="interactions">
                    <Button onDismiss={() => this.fetchSearchTopStories(searchKey, page + 1)}>
                        Больше историй
                    </Button>
                </div>
            </div>
        );
    }
}
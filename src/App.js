import React, {Component} from 'react'
import './App.css'
import Search from './components/Search'
import UserList from './components/UserList'

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: null,
            searchTerm: 'redux'
            //list: this.props.data,
            //searchTerm: ''
        }
    };

    onDismiss = (id) => {
        const {list} = this.state;
        const updatedList = list.hits.filter((item) => item.objectID !== id);

        this.setState({list: {...list, hits: updatedList}});
    };

    onSearchChange = (e) => {
        this.setState({searchTerm: e.target.value});
    };

    setSearchTopStories = (list) => {
        this.setState({ list });
    };

    componentDidMount() {
        const { searchTerm } = this.state;
        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
            .then(response => response.json())
            .then(list => this.setSearchTopStories(list))
            .catch(error => error);
    }

    render() {
        const {list, searchTerm} = this.state;

        if (!list) { return null; }

        return (
            <div className="page">
                <div className="interactions">
                    <Search value={searchTerm} onChange={this.onSearchChange}>Поиск</Search>
                </div>
                <UserList list={list.hits} pattern={searchTerm} onDismiss={this.onDismiss}/>
            </div>

        );
    }
}
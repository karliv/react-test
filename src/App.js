import React, {Component} from 'react'
import './App.css'
import Search from './components/Search'
import UserList from './components/UserList'

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: this.props.data,
            searchTerm: ''
        }
    };

    onDismiss = (id) => {
        const {list} = this.state;
        const updatedList = list.filter((item) => item.objectID !== id);

        this.setState({list: updatedList})
    };

    onSearchChange = (e) => {
        this.setState({searchTerm: e.target.value})
    };

    render() {
        const {list, searchTerm} = this.state;

        return (
            <div className="page">
                <div className="interactions">
                    <Search value={searchTerm} onChange={this.onSearchChange}>Поиск</Search>
                </div>
                <UserList list={list} pattern={searchTerm} onDismiss={this.onDismiss}/>
            </div>

        );
    }
}
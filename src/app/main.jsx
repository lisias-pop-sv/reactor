import '../assets/css/styles.styl';

import React from 'react';
import ReactDOM from 'react-dom';

import Stopwatch from './modules/stopwatch.jsx';
// import Avatar from './modules/avatar.jsx';
import Watcher from './modules/watcher.jsx';
import ComboBox from './modules/combo-box.jsx';
import Counter from './modules/counter.jsx';
import DropdownMenu from './modules/dropdown-menu.jsx';
import GroceryList from './modules/grocery.jsx';
import FilteredList from './modules/filtered-list.jsx';
import LikeButton from './modules/likeBtn.jsx';
import MyModule from './modules/my-module.jsx';
import GrepBox from './modules/grep-box.jsx';

ReactDOM.render(<Stopwatch offsetStartTime={1000 * (3600 * 0 + 60 * 1 + 5)}/>, document.getElementById('stopwatch'));
// ReactDOM.render(<Avatar username={'John Doe'}/>, document.getElementById('avatar'));
ReactDOM.render(<Watcher />, document.getElementById('watcher'));
ReactDOM.render(<ComboBox optionList={['All options', 'Open', 'Clo sed', 'Single', 'Double', 'All']}/>, document.getElementById('combo-box'));
ReactDOM.render(<Counter />, document.getElementById('counter'));
ReactDOM.render(<DropdownMenu optionList={['main.jsx', 'two', 'tree']} />, document.getElementById('dropdown-menu'));
ReactDOM.render(<GroceryList itemList={['Apple', 'Banana', 'Cranberry']}/>, document.getElementById('grocery'));
ReactDOM.render(<FilteredList />, document.getElementById('filtered'));
ReactDOM.render(<LikeButton />, document.getElementById('like-button'));
ReactDOM.render(<MyModule owner={'John'} task={'write code'}/>, document.getElementById('my-module'));
ReactDOM.render(<GrepBox />, document.getElementById('grep-box'));

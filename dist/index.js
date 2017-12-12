//这个demo主要用于redux管理react的状态
import React from 'react'
import ReactDom from 'react-dom'
import { createStore,applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducer from './redux/reducers';
import AppleStore from './redux/components/appleStore'

// console.log(reducer);
const store = createStore(reducer,applyMiddleware(thunk));
ReactDom.render(
	<Provider store={store} >
		<AppleStore />
	</Provider>,
	document.getElementById('app')
)

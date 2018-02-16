/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';
import s from './App.scss';
import Header from '../Header';
import Feedback from '../Feedback';
import Footer from '../Footer';

class App extends Component {

  constructor( props, context ) {
    super( props, context);
  //   this.state = {
  //     blockNumber:0,
  //     blockArray:[],
  // };
  //   if (typeof web3 !== 'undefined') {
  //     web3 = new Web3(web3.currentProvider);
  //   } else {
  //     // set the provider you want from Web3.providers
  //     web3 = new Web3(new Web3.providers.HttpProvider(ETHERIUM_ENDPOINT));
  //   }

  }

  componentDidMount() {
    // web3.eth.subscribe( 'newBlockHeaders', (error, result) => {
    //   this.setState({blockArray: [...this.state.blockArray, result]})
    // });
      
    // web3.eth.getBlockNumber().then((data) => {
    //   this.setState({blockNumber: data})
    // });

  }
  static propTypes = {
    context: PropTypes.shape({
      insertCss: PropTypes.func,
      onSetTitle: PropTypes.func,
      onSetMeta: PropTypes.func,
      onPageNotFound: PropTypes.func,
    }),
    children: PropTypes.element.isRequired,
    error: PropTypes.object,
  };

  static childContextTypes = {
    insertCss: PropTypes.func.isRequired,
    onSetTitle: PropTypes.func.isRequired,
    onSetMeta: PropTypes.func.isRequired,
    onPageNotFound: PropTypes.func.isRequired,
  };

  getChildContext() {
    const context = this.props.context;
    return {
      insertCss: context.insertCss || emptyFunction,
      onSetTitle: context.onSetTitle || emptyFunction,
      onSetMeta: context.onSetMeta || emptyFunction,
      onPageNotFound: context.onPageNotFound || emptyFunction,
    };
  }

  componentWillMount() {
    const { insertCss } = this.props.context;
    this.removeCss = insertCss(s);
  }

  componentWillUnmount() {
    this.removeCss();
  }

  render() {
    return !this.props.error ? (
      <div>
        <Header />
        {this.props.children}
        {/* <Feedback />
        <Footer /> */}
      </div>
    ) : this.props.children;
  }

}

export default App;

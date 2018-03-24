import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';

export default class InjectFirebaseData extends Component {
  static propTypes = {
    firebaseRef: PropTypes.object.isRequired,
    renderWhileLoading: PropTypes.bool,
    children: PropTypes.func.isRequired
  };

  static defaultProps = {
    renderWhileLoading: false
  };

  state = {
    loading: true,
    data: {},
    dataKey: null
  };

  componentDidMount = () =>
    this.props.firebaseRef.on('value', this.handleValueUpdate);

  componentWillUnmount = () =>
    this.props.firebaseRef.off(this.handleValueUpdate);

  handleValueUpdate = snapshot =>
    this.setState({
      loading: false,
      data: snapshot.val(),
      dataKey: snapshot.key
    });

  render = () => {
    const { loading, data, dataKey } = this.state;
    const { renderWhileLoading, children } = this.props;

    if (!loading) return children({ data, dataKey });
    if (renderWhileLoading) return children({ loading, data, dataKey });

    return null;
  };
}

export InjectFirebaseDataHOC from './InjectFirebaseDataHOC';

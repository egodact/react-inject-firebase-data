import React, { Component } from 'react';
import getDisplayName from 'react-display-name';
import InjectFirebaseData from './index';

const InjectFirebaseDataHOC = (
  firebaseRef,
  renderWhileLoading
) => (WrappedComponent) => {
  return class extends Component {
    static displayName = `InjectFirebaseData(${getDisplayName(
      WrappedComponent
    )})`;

    render = () => (
      <InjectFirebaseData
        firebaseRef={firebaseRef}
        renderWhileLoading={renderWhileLoading}
      >
        {props => <WrappedComponent {...this.props} {...props} />}
      </InjectFirebaseData>
    );
  }
};

export default InjectFirebaseDataHOC;

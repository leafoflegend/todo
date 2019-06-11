import React from 'react';
import ReactDOM from 'react-dom';

const FakeComponent = () => {
  return <span> Hello! </span>;
};

ReactDOM.render(<FakeComponent />, document.getElementById('app'));

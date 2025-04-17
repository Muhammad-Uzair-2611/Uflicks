// CrashComponent.jsx
import React from 'react';

const Error = () => {
  throw new Error("This is a test error!");
  return <div>You will never see this.</div>;
};

export default Error;

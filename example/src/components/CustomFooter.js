import React from 'react';

const CustomFooter = (props) => {
  return (
    <div>
      <button onClick={props.handleSubmit}>Custom Button</button>
    </div>
  )
}

export default CustomFooter;
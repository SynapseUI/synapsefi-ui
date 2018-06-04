import React from 'react';

import App from './src/App';
import FormApp from './src/FormApp';

const pages = {
  app: <App/>,
  form: <FormApp/>
}

class Home extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      currentPage: 'app'
    }
  }

  render(){
    return(
      <div>
        {pages[this.state.currentPage]}
      </div>
    )
  }
}

export default Home;

import React from 'react';
import Fileupload from './components/file-upload'
import Orders from './components/orders';
import './App.css';

function App() {
  return (
    <div className="App">
      <Fileupload />
      <Orders />
      {/* {isLoading ? <div className='loader'><div className='loader-icon' /> </div> : ''} */}
    </div>
  );
}

export default App;

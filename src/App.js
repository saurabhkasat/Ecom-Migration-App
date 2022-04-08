import React, {useState} from 'react';
import Fileupload from './components/file-upload'
import Orders from './components/orders';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="App">
      <Fileupload setLoading = {(isLoading) => setIsLoading(isLoading)}/>
      <Orders isLoading = {isLoading}/>
      {isLoading ? <div className='loader'><div className='loader-icon'/> </div> : ''}
    </div>
  );
}

export default App;

import './App.css';
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { Router } from "./Config/Router";
import { useState } from 'react';

function App() {

  const [user, setUser] = useState()
  
  return (
    <div className='bg-gray-900'>
    <Header user={user} setUser={setUser}/>

    <div className='relative container max-w-[1000px] mx-auto min-h-[85vh]'>
      <Router setUser={setUser}/>
    </div>

    <Footer/>
    </div>
  );
}

export default App;

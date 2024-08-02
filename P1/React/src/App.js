import './App.css';
import Nav from './nav';
import Gamezone from './gamezone';
function App() {
  return (
    <div className="App">

      <div>
        <Nav />
      </div>
      



      <div  style={{margin:'auto' }}>
        
        <Gamezone />


      </div>




      {/* <div className="App-header">

        <h1>My Portfolio</h1>
          <p>
            Welcome to my portfolio!
          </p>
      </div> */}

      
    </div>

    
    // <div className="App">
  
    //   {/* <Nav /> */}
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;

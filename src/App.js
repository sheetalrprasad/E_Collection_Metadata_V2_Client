import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CollectionListApp from './CollectionsList/CollectionListApp';
import VendorListApp from './Vendor/VendorListApp';
import HomePage from './homepage/home';
import EcollectionHome from './973ECollection/E_CollectionHome';
import PcollectionHome from './973PCollection/P_CollectionHome';
import sdsu_logo from './static/sdsu_primary_logo.png'
import LoginApp from './Login/LoginApp';


function App() {


  return (
    <div className="App">

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          <img src={sdsu_logo} width="250" height="30" alt="" />
        </a>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/allcollections">E-Collections</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/vendors">Vendor</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="/" id="navbarDropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                973
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a className="dropdown-item" href="/ecollections">973 E-Collections</a>
                <a className="dropdown-item" href="/pcollections">973 P-Collections</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>

      <div className='web-body'>
        <Router>
          <Routes>
            <Route path='/login' element={<LoginApp />} exact />
            <Route path='/' element={<HomePage />} exact />
            <Route path="/allcollections" element={<CollectionListApp />} exact />
            <Route path="/vendors" element={<VendorListApp />} exact />
            <Route path="/pcollections" element={<PcollectionHome />} exact />
            <Route path="/ecollections" element={<EcollectionHome />} exact />
          </Routes>
        </Router>
      </div>




    </div>
  );
}

export default App;

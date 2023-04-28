import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import VendorListApp from './Vendor/VendorListApp';
import HomePage from './homepage/home';
import EcollectionHome from './973ECollection/E_CollectionHome';
import PcollectionHome from './973PCollection/P_CollectionHome';
import EcollectionEdit from './973ECollection/E_CollectionEdit';
import PcollectionEdit from './973PCollection/P_CollectionEdit';
import CollectionListApp from './CollectionsList/CollectionListApp';
import CollectionListEdit from './CollectionsList/CollectionListEdit';
import CollectionListAddNew from './CollectionsList/CollectionListAddNew';
import Collection973ListApp from './Collection973/Collections973List';
import sdsu_logo from './static/sdsu_primary_logo.png'
import LoginApp from './Login/LoginApp';
import PcollectionAddNew from './973PCollection/P_CollectionAddNew';
import EcollectionAddNew from './973ECollection/E_CollectionAddNew';


function App() {

  const [authenticated, setAuthenticated] = useState(false);

  function logout() {
      setAuthenticated(false);
      localStorage.clear();
  }

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setAuthenticated(true);
    }
  }, [authenticated]);

  return (
    <div className="App">

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          <img src={sdsu_logo} width="250" height="30" alt="" />
        </a>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav mr-auto">
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
                <a className="dropdown-item" href="/collectionList">All 973 Collections</a>
                <a className="dropdown-item" href="/ecollections">973 E-Collections</a>
                <a className="dropdown-item" href="/pcollections">973 P-Collections</a>
              </div>
            </li>
          </ul>
          <ul className="nav navbar-nav ms-auto">
          { authenticated ? (
            <li className="nav-item"><a className="nav-link" href="/login" onClick={ () => logout() }>Logout</a></li>
            ): (
            <li className="nav-item"><a className="nav-link" href="/login">Login</a></li>
            )}
          </ul>
        </div>
      </nav>

      <div className='web-body'>
        <Router>
          <Routes>
            <Route path='/login' element={<LoginApp setAuthenticated = {setAuthenticated} />} exact />
            <Route path='/'  element={<HomePage />} exact />
            <Route path="/allcollections"  element={<CollectionListApp />} exact />
            <Route path="/allcollections-edit" element={<CollectionListEdit />} exact />
            <Route path="/allcollections-add" element={<CollectionListAddNew />} exact />
            <Route path="/vendors" element={<VendorListApp />} exact />
            <Route path="/collectionList"  element={<Collection973ListApp />} exact />
            <Route path="/pcollections" element={<PcollectionHome />} exact />
            <Route path="/ecollections" element={<EcollectionHome />} exact />
            <Route path="/ecollections-edit" element={<EcollectionEdit />} exact />
            <Route path="/ecollections-add" element={<EcollectionAddNew />} exact />
            <Route path="/pcollections-edit" element={<PcollectionEdit />} exact />
            <Route path="/pcollections-add" element={<PcollectionAddNew />} exact />
          </Routes>
        </Router>
      </div>




    </div>
  );
}

export default App;

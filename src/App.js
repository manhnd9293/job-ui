import './App.css';
import classes from './app.module.css'
import { Header } from './component/layout/header/Header';
import { Footer } from './component/layout/footer/Footer';
import { Route, Routes } from 'react-router-dom';
import { Login } from './view/login/Login';
function App() {
  return (
    <div className={classes.app}>
      <Header></Header>
      <div className={classes.appBody}>
        <Routes>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;

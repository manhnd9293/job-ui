import './App.css';
import { Home } from './view/home/Home';
import classes from './app.module.css'
import { Header } from './component/layout/header/Header';
import { Footer } from './component/layout/footer/Footer';
function App() {
  return (
    <div className={classes.app}>
      <Header></Header>
      <div className={classes.appBody}></div>
      <Footer></Footer>
    </div>
  );
}

export default App;

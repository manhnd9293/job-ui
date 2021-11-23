import "./App.css";
import classes from "./app.module.css";
import { Header } from "./component/layout/header/Header";
import { Footer } from "./component/layout/footer/Footer";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { Login } from "./view/login/Login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseAxios } from "./config/AxiosConfig";
import { logInUser } from "./store/user/UserAction";
import { Home } from "./view/home/Home";
import { SideBar } from "./component/layout/sidebar/SideBar";
import { CompanySearch } from "./view/company/companySearch/CompanySearch";
import { CompanyDetail } from "./view/company/detail/CompanyDetail";

function App() {
  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!userId && !accessToken) {
      navigate("/login");
    } else if (accessToken) {
      baseAxios.get("/user/info")
        .then((res) => {
          const userInfo = res.data;
          dispatch(logInUser(userInfo));
        })
        .catch(() => {
          navigate("/login");
        });
    }

    return () => {};
    // e
  }, []);

  return (
    <div className={classes.app}>
      <Header/>
      <div className={classes.appBody}>
        {userId && <SideBar></SideBar>}
        <div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/company/search" element={<CompanySearch />} />
            <Route path="/company/detail" element={<CompanyDetail />} />
          </Routes>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;

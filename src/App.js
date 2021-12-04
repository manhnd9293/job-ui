import "./App.css";
import classes from "./app.module.css";
import { Header } from "./component/layout/header/Header";
import { Footer } from "./component/layout/footer/Footer";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { Login } from "./view/user/login/Login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseAxios } from "./config/AxiosConfig";
import { logInUser } from "./store/user/UserAction";
import { Home } from "./view/home/Home";
import { SideBar } from "./component/layout/sidebar/SideBar";
import { CompanySearch } from "./view/company/companySearch/CompanySearch";
import { CompanyDetail } from "./view/company/detail/CompanyDetail";
import JobPost from "./view/job/postNew/JobPost";
import PostReview from "./view/job/review/PostReview";
import JobPostingList from "./view/job/postingList/PostingList";
import {RoutePath} from "./constant/RouteConstant";
import JobSearch from "./view/job/search/JobSearch";
import SignUp from "./view/user/signUp/SignUp";
import CreateCompany from "./view/company/createCompany/CreateCompany";

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
        {userId && <SideBar/>}
        <div className={classes.appContent}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<JobSearch />} />
            <Route path="/company/search" element={<CompanySearch />} />
            <Route path="/company/detail" element={<CompanyDetail />} />
            <Route path="/job/post" element={<JobPost />} />
            <Route path="/job/posting/list" element={<JobPostingList />} />
            <Route path="/job/post/review" element={<PostReview />} />
            <Route path={RoutePath.SearchJob} element={<JobSearch />} />
            <Route path={RoutePath.SignUp} element={<SignUp />} />
            <Route path={RoutePath.CreateCompanyPage} element={<CreateCompany />} />
          </Routes>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;

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
import MyCompanyList from "./view/company/myCompanyList/MyCompanyList";
import axios from "axios";

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
            <Route path={RoutePath.Login} element={<Login />} />
            <Route path={RoutePath.SignUp} element={<SignUp />} />
            <Route path={RoutePath.Home} element={<JobSearch />} />

            <Route path={RoutePath.ListCompany} element={<CompanySearch />} />
            <Route path={RoutePath.CompanyDetail} element={<CompanyDetail />} />
            <Route path={RoutePath.CreateCompanyPage} element={<CreateCompany />} />
            <Route path={RoutePath.MyCompanyList} element={<MyCompanyList />} />

            <Route path={RoutePath.PostJob} element={<JobPost />} />
            <Route path={RoutePath.ListJobPost} element={<JobPostingList />} />
            <Route path={RoutePath.JobPostReview} element={<PostReview />} />
            <Route path={RoutePath.SearchJob} element={<JobSearch />} />
          </Routes>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;

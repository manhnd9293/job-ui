import React from "react";
import { Link } from "react-router-dom";
import classes from "./header.module.css";
import { useSelector } from "react-redux";
export const Header = () => {
  const user = useSelector(state => state.user);

  return (
    <div className={classes.container}>
      <nav>
        <div className={classes.firstNav}>
          <div className={classes.appName}>
            <Link to={"/"} style={{ color: "white", textDecoration: "none" }}>
              DEVJOB
            </Link>
          </div>
          <input
            className={classes.searchJob}
            type="text"
            placeholder="Search for title, skills, company"
          />
          <select placeholder="city" className={classes.citySelect}>
            <option>Hanoi</option>
            <option>Danang</option>
            <option>HoChiMinh</option>
          </select>
        </div>
        <div className={classes.secondNav}>
            <span>{user.username}</span>
        </div>
      </nav>
    </div>
  );
};

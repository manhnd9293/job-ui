import React from 'react'
import classes from "./companySearch.module.css";
import { Link } from "react-router-dom";

export const ActionBar = () => {
    return (
        <div className={classes.actionBar}>
        <div style={{ textAlign: "center" }}>
          <Link to="/company/create">
            <button>Create a company</button>
          </Link>
        </div>
        <div className={classes.hSep}></div>
        <div>
          <input type={"checkbox"}></input>
          <span>Your company</span>
        </div>
        <div className={classes.hSep}></div>
        <div>
          <div>
            <div>Search name</div>
            <input style={{ margin: "10px 0px" }} type="text"></input>
          </div>
          <div>
            <div>Industry</div>
            <select
              style={{ margin: "10px 0px" }}
              placeholder="select industry"
            >
              <option>Information technology</option>
            </select>
          </div>
          <div>
            <div>Locaton</div>
            <select
              style={{ margin: "10px 0px" }}
              placeholder="select industry"
            >
              <option>Hanoi</option>
              <option>Danang</option>
              <option>Hochiminh</option>
            </select>
          </div>
          <div>
            <div>Size</div>
            <select
              style={{ margin: "10px 0px" }}
              placeholder="select industry"
            >
              <option>1-10 employees</option>
              <option>10-100 employees</option>
              <option>100-500 employees</option>
            </select>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <button>Search company</button>
        </div>
      </div>
    )
}

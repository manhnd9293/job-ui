import React, {useEffect, useState} from 'react'
import classes from "./companySearch.module.css";
import {baseAxios} from "../../../config/AxiosConfig";
import {useLocation} from "react-router-dom";

export const ActionBar = ({onSearch, searchData}) => {
    const query = new URLSearchParams(useLocation().search);
    const searchKey = query.get('searchKey') || '';
    const industry = query.get('industry') || '';
    const location = query.get('city') || '';
    const size = query.get('size') || '';

    const [cityList, setCityList] = useState([]);
    const [sizeList, setSizeList] = useState([]);
    const [industryList, setIndustryList] = useState([]);
    const [filterObject, setFilterObject] = useState({searchKey, industry, location, size});

    const industryLabel = 'choose industry';
    const locationLabel = 'choose location';
    const sizeLabel = 'choose company size';

    useEffect(() => {
        const industryPr = baseAxios.get('/company/list/industry');
        const sizePr = baseAxios.get('/company/list/size');
        const cityPr = baseAxios.get('/company/list/city');
        Promise.all([industryPr, sizePr, cityPr]).then(values => {
            const [industryRes, sizeRes, cityRes] = values;
            setIndustryList(industryRes.data);
            setSizeList(sizeRes.data);
            setCityList(cityRes.data);
        });
    }, []);

    function handleChangeIndustry(e) {
        const value = e.target.value;
        setFilterObject({...filterObject, ...{industry: value === industryLabel ? null : value}});
    }

    function handleChangeLocation(e) {
        const value = e.target.value;
        setFilterObject({...filterObject, ...{location: value === locationLabel ? null : value}});
    }

    function handleChangeSize(e) {
        const value = e.target.value;
        setFilterObject({...filterObject, ...{size: value === sizeLabel ? null : value}});
    }


    function handleChangeSearchKey(e) {
        let value = e.target.value;
        setFilterObject({...filterObject, ...{searchKey: (value ? value : null)}});
    }

  function handleSearchCompany() {
    onSearch(filterObject);
  }

  return (
        <div className={classes.actionBar}>
            <div>
                <div>
                    <div>Search name</div>
                    <input onChange={handleChangeSearchKey}
                           value={filterObject.searchKey}
                           style={{margin: "10px 0px"}} type="text"/>
                </div>
                <div>
                    <div>Industry</div>
                    <select
                        style={{margin: "10px 0px"}}
                        onChange={handleChangeIndustry}
                        value={filterObject.industry}
                    >
                        <option key={`null`} value={''}>{industryLabel}</option>
                        {industryList && industryList.map((industry, index) => (
                            <option key={index} value={industry}>{industry}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <div>Locaton</div>
                    <select
                        style={{margin: "10px 0px"}}
                        placeholder="select location"
                        onChange={handleChangeLocation}
                        value={filterObject.location}
                    >
                        <option key={`null`} value={''}>{locationLabel}</option>
                        {cityList && cityList.map((city, index) => (
                            <option key={index} value={city}>{city}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <div>Size</div>
                    <select
                        style={{margin: "10px 0px"}}
                        placeholder="select company size"
                        onChange={handleChangeSize}
                        value={filterObject.size}
                    >
                        <option key={`null`} value={''}>{sizeLabel}</option>
                        {sizeList && sizeList.map((size, index) => (
                            <option key={index} value={size}>{`${size.trim().split('-').join(' ')} employees`}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div style={{textAlign: "center"}}>
                <button onClick={handleSearchCompany}>Search company</button>
            </div>
        </div>
    )
}

import React, {useEffect, useState} from 'react';
import {baseAxios} from "../../../config/AxiosConfig";
import CompanyCard from "../companyCard/CompanyCard";

const MyCompanyList = () => {
    const [myCompany, setMyCompany] = useState([]);
    useEffect(() => {
        baseAxios.get('/company/myOwn').then(res => {
            const list = res.data;
            setMyCompany(list);
        })
    },[])

    return (
        <div>
            <div className={'viewTitle'}>My Company List</div>
            {myCompany.map(company =>
                <CompanyCard id={company._id}
                             company={company}
                />
            )}
        </div>
    );
};

export default MyCompanyList;
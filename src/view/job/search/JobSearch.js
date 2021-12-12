import React, {useEffect, useState} from 'react';
import classes from './jobSearch.module.css'
import {baseAxios} from "../../../config/AxiosConfig";
import ReactHtmlParser from 'react-html-parser'
import {getCLS} from "web-vitals";
import {Link} from "react-router-dom";
import {RoutePath} from "../../../constant/RouteConstant";

const JobSearch = () => {
    const [jobList, setJobList] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);


    useEffect(() => {
        baseAxios.get('/job/posted').then(res => {
            const postedList = res.data;
            setJobList(postedList);
            postedList.length > 0 && viewJobDetail(postedList[0]._id)();
        }).catch(e => {
            console.log(e);
        })
    }, [])

    const viewJobDetail = (jobId) => e => {
        baseAxios.get(`/job/detail/${jobId}`)
            .then(res => {
                setSelectedJob(res.data);
            })
    }

    return (
        <>
            <div className={`viewTitle`}>Search job</div>
            <div className={classes.container}>
                <div className={classes.jobList}>
                    {jobList.map(job => (
                        <>
                            <div key={job._id}
                                 onClick={viewJobDetail(job._id)}
                                 className={`${classes.jobCard} ${(job._id === selectedJob?._id) ? classes.isSelected : ''}`}
                            >
                                <div style={{padding: 5}}>
                                    <img style={{width: 45, height: 45}}
                                         src={`${process.env.REACT_APP_SERVER_URL}/api/v1/company/${job.companyId._id}/logo/v${job.companyId.logoVersion}`}/>
                                </div>
                                <div>
                                    <div style={{fontWeight: 'bold'}}>{job.title}</div>
                                    <div>{job.companyId.name}</div>
                                    <div>{job.workAddress}</div>
                                </div>
                            </div>
                            <div key={`${job._id}-sep`}
                                 className={classes.hSep}
                            />
                        </>

                    ))}
                </div>
                <div className={classes.vSep}/>
                {
                    selectedJob && (
                        <div className={`${classes.jobDetail}`}>
                            <div className={classes.jobTitle}>{selectedJob.title}</div>
                            <div className={'mt10'}>
                                <span>{selectedJob.companyId.name} - </span>
                                <span>{selectedJob.workAddress}</span>
                            </div>
                            <div className={'mt5'}>{selectedJob.companyId.size}</div>
                            <div className={classes.salaryRange + ' mt5'}>
                                <span>{selectedJob.salary.from} $ - </span>
                                <span>{selectedJob.salary.to} $</span>
                            </div>
                            <div className={'mt10'}>
                                <button className={'baseButton'}> Apply </button>
                                <button className={'baseOutlineButton ml10'}> Save </button>
                            </div>
                            <div className={'mt10'}>
                                {ReactHtmlParser(selectedJob.jobDescription)}
                            </div>
                            <div className={classes.hSep}/>
                            <div className={classes.title}>About the company</div>
                            <div className={classes.companyBrief}>
                                <div>
                                    <img style={{width: 50, height: 50}} src={getLogoUrl(selectedJob.companyId._id)}/>
                                </div>
                                <div>
                                    <Link to={`${RoutePath.CompanyDetail}?id=${selectedJob.companyId._id}` } style={{color: 'black', textDecoration:'none'}}>
                                        <div className={classes.companyInfoName}>
                                            {selectedJob.companyId.name}
                                        </div>
                                    </Link>

                                    <div className={'mt5'}>
                                        {selectedJob.companyId.size}
                                    </div>
                                </div>

                            </div>
                            <div className={classes.companyDes}>
                                {selectedJob.companyId.description}
                            </div>
                        </div>

                    )
                }

            </div>
        </>
    );
};

function getLogoUrl(companyId) {
    return `${process.env.REACT_APP_SERVER_URL}/api/v1/company/${companyId}/logo/latest`
}

export default JobSearch;
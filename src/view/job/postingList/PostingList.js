import React, {useEffect, useState} from 'react';
import {baseAxios} from "../../../config/AxiosConfig";
import classes from './jobPostingList.module.css'
import {Link, useNavigate} from "react-router-dom";

const JobPostingList = () => {
    const [jobList, setJobList] = useState([]);
    const navigate = useNavigate();
    useEffect(()=> {
        baseAxios.get('/job').then(res => {
            setJobList(res.data)
        })
    },[])

    const goToReviewJob = (id) => e => {
      navigate(`/job/post/review?jobId=${id}`)
    }

    return (
        <div>
            <div className={'viewTitle'}> Posting list view</div>
            <div>
                <Link to={'/job/post'}>
                    <button className={'baseButton'}>Post a free job</button>
                </Link>
            </div>
            <div>
                {jobList.map(job => (
                    <div key={job._id} className={classes.jobCard}
                        onClick={goToReviewJob(job._id)}
                    >
                        <div>
                            <img style={{width: '60px', height: '60px'}} src={`${process.env.REACT_APP_SERVER_URL}/api/v1/company/${job.companyId._id}/logo/v${job.companyId.logoVersion}`}/>
                        </div>
                        <div className={classes.jobInfo}>
                            <div className={classes.jobTitle}>{job.title}</div>
                            <div>{job.companyId.name}</div>
                            <div>{job.workAddress}</div>
                        </div>
                        <div>{job.status}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JobPostingList;
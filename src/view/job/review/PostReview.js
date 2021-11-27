import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {baseAxios} from "../../../config/AxiosConfig";
import ReactHtmlParser from 'react-html-parser'
import classes from './postReview.module.css'

const PostReview = () => {
    const [reviewJob, setReviewJob] = useState({});
    const query = new URLSearchParams(useLocation().search);

    useEffect(() => {
        const jobId = query.get('jobId');
        baseAxios.get(`/job/review/${jobId}`).then(res => {
            setReviewJob(res.data);
        }).catch(e => {
            console.log(`Fail to get job review ${e}`);
        })
    },[])

    return (
        <>
            <div className={'viewTitle'}>Review job</div>
            <div  className={classes.viewContainer}>
                <div>
                    {reviewJob.title}
                </div>
                <div>{reviewJob.salary?.from} - {reviewJob.salary?.to} $</div>
                <div>{reviewJob.workAddress}</div>
                <div>{ReactHtmlParser(reviewJob.jobDescription)}</div>
            </div>
        </>

    );
};

export default PostReview;
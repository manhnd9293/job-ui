import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {baseAxios} from "../../../config/AxiosConfig";
import ReactHtmlParser from 'react-html-parser'
import classes from './postReview.module.css'
import {RoutePath} from "../../../constant/RouteConstant";

const PostReview = () => {
    const [reviewJob, setReviewJob] = useState({});
    const query = new URLSearchParams(useLocation().search);
    const navigate = useNavigate();

    useEffect(() => {
        const jobId = query.get('jobId');
        baseAxios.get(`/job/review/${jobId}`).then(res => {
            setReviewJob(res.data);
        }).catch(e => {
            console.log(`Fail to get job review ${e}`);
        })
    },[])

    const publishJob = () => {
        const jobId = query.get('jobId');
        baseAxios.put('/job', {
            jobId
        }).then(res => {
            navigate(RoutePath.ListJobPost);
        }).catch(e => {
            console.log(e);
            alert('Fail to publish job');
        })
    };

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
            <div style={{marginTop: 10}}>
                <button className={'baseButton'}
                        onClick={publishJob}
                > Publish job</button>
            </div>
        </>

    );
};

export default PostReview;
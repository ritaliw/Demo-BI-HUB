import React from 'react';
import { Card, CardImg, CardTitle, CardSubtitle } from 'reactstrap';
import './Report.css'
export function Report(props) {
    return (
        <div className='card-block col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2'>
            <a href="##" className="reportLink" >
                <Card body outline className="cardOutline">
                    <CardTitle className='card-title' top > {props.title}</CardTitle>
                    <CardImg top width="100%" src={require("../../images/reportCardVisualImages/image.png")} alt="Card image cap" />
                    <CardSubtitle>{props.type}</CardSubtitle>
                    <CardSubtitle>{props.page}</CardSubtitle>
                    <CardSubtitle>{props.collectionName}</CardSubtitle>
                </Card>
            </a>
        </div>
    );
}

export default Report;

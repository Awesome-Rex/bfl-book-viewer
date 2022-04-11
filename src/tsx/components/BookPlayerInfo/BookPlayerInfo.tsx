import React, { ReactComponentElement } from 'react';
import "./book-player-info.scss";

import Heading from 'src/tsx/helpers/Heading';
import PageBanner from 'src/tsx/layout/PageBanner';

export default function BookPlayerInfo(
    {
        title = "", 
        level = 1, 
        image = "", 
        alt = "", 
        tags = [], 
        children: description = <></>, 
        className = ""
    }: {
        title: string, 
        level?: number, 
        image?: string, 
        alt?: string, 
        tags?: string[], 
        children?: React.ReactNode, 
        className?: string
    }) {
    return (
        <PageBanner banner={{className: `book-player-info ${className}`}}>
            <div className="image -live-area">
                <img className="-live-area" src={image} alt={alt} />
            </div>

            <div className="info">
                <Heading level={level} className="title">{title}</Heading>
                
                <hr />
                <div className="tags">
                    {tags.map((tag, i, arr) => 
                        <span key={i}>{tag}</span>
                    )}
                </div>
                <div className="description">
                    {description}
                </div>
                <div className="drawer"><span className="text"></span></div>
            </div>
        </PageBanner>
    );
}
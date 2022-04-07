import React, { ReactComponentElement } from 'react';
import "./book-player-info.scss";

import Heading from 'helpers/Heading';

export default function BookPlayerInfo({title = "", level = 1, image = "", alt = "", tags = [], children: description = <></>, className = ""}: {title: string, level: number, image: string, alt: string, tags: string[], children: any, className: string}) {
    return (
        <div className={`book-player-info page-banner ${className}`}>
            <div>
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
            </div>
        </div>
    );
}
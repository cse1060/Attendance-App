import React from 'react'
import { Link } from 'react-router-dom';

export default function ClassCard(props) {
    return (
      <div>
        <Link to={"/take_attendance"}>
          <div className="wrap animate pop classcard">
            <div className="overlay">
              <div className="overlay-content animate slide-left delay-2">
                <h1 className="animate slide-left pop delay-4">
                  {props.classId}
                </h1>
                <p
                  className="animate slide-left pop delay-5" /*style="color: white; margin-bottom: 2.5rem;"*/
                >
                  <em>{props.name}</em>
                </p>
              </div>
              <div className="image-content animate slide delay-5"></div>
              <div className="dots animate">
                <div className="dot animate slide-up delay-6"></div>
                <div className="dot animate slide-up delay-7"></div>
                <div className="dot animate slide-up delay-8"></div>
              </div>
            </div>
                    <div className="text">{props.text}</div>
          </div>
        </Link>
      </div>
    );
}

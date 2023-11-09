import React from 'react'

export default function ClasssCard() {
    return (
        <div>
            <div className="wrap animate pop classcard">
                <div className="overlay">
                    <div className="overlay-content animate slide-left delay-2">
                        <h1 className="animate slide-left pop delay-4">ClassId</h1>
                        <p className="animate slide-left pop delay-5" /*style="color: white; margin-bottom: 2.5rem;"*/>Data <em>Structures</em></p>
                    </div>
                    <div className="image-content animate slide delay-5"></div>
                    <div className="dots animate">
                        <div className="dot animate slide-up delay-6"></div>
                        <div className="dot animate slide-up delay-7"></div>
                        <div className="dot animate slide-up delay-8"></div>
                    </div>
                </div>
                <div className="text">

                </div>
            </div>
        </div>
    )
}

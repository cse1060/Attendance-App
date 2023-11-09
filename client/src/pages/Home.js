import React, { useCallback } from 'react'
import Particles from "react-particles";
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "tsparticles-slim";
import Navbar from '../components/Navbar.tsx'
import "../css/home.css"

import { TypeAnimation } from 'react-type-animation';

export default function Home() {
    const particlesInit = useCallback(async engine => {
        console.log(engine);
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);

    return (
        <>
            <Navbar />
            <div className='home_header'>
                <h1>AttendEase</h1>
                <TypeAnimation
                    className='animation'
                    sequence={[
                        // Same substring at the start will only be typed out once, initially
                        'Attendance made easy, one tap at a time!',
                        1000,
                        'Simplify your attendance process with our sleek app!',
                        1000,
                    ]}
                    wrapper="span"
                    speed={50}
                    style={{ fontSize: '2.2em', fontWeight: "bold", display: 'inline-block', fontFamily: 'Playfair Display', color: 'rgb(1, 11, 28)' }}
                    repeat={Infinity}
                />
                <br />
                <button className='btn'>Get Started</button>
            </div>
            <Particles
                className="particles"
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={{
                    background: {
                        color: {
                            value: "#929292",
                        },
                    },
                    fpsLimit: 120,
                    interactivity: {
                        events: {
                            onClick: {
                                enable: true,
                                mode: "push",
                            },
                            onHover: {
                                enable: true,
                                mode: "repulse",
                            },
                            resize: true,
                        },
                        modes: {
                            push: {
                                quantity: 4,
                            },
                            repulse: {
                                distance: 200,
                                duration: 0.4,
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: "#0F0F0F",
                        },
                        links: {
                            color: "#0F0F0F",
                            distance: 150,
                            enable: true,
                            opacity: 0.5,
                            width: 1,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outModes: {
                                default: "bounce",
                            },
                            random: false,
                            speed: 6,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 800,
                            },
                            value: 100,
                        },
                        opacity: {
                            value: 0.5,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            value: { min: 1, max: 10 },
                        },
                    },
                    detectRetina: true,
                }}
            />
        </>
    );
}
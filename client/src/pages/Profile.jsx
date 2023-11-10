import React, { useEffect } from 'react'
import "../css/profile.css"
import ClassCard from '../components/ClassCard'
import middleware from "../middleware/middleware.js"
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.tsx'

export default function Profile() {

    const navigate = useNavigate();
    async function verifyUser() {
        const res = await middleware();
        if (res === false) {
            navigate("/login")
        }
    }


    useEffect(() => {
        verifyUser();
    }, [])


    return (
        <div>
            <Navbar />
            <div class="main">
                <center>
                    {/* <button class="buton" onclick="logout()">
                        Logout
                    </button> */}
                </center>
                <center>
                    <h1 className="head">User Profile</h1>

                    <div class="flex-container">
                        <div>
                            {/* <button class="github-button">CS201</button> */}
                            <ClassCard
                                classId="CS201"
                                name="Discrete Mathematics"
                                text="Embark on a fascinating journey through the principles of Discrete Mathematics in this dynamic course. Delve into the study of mathematical structures and concepts crucial for computer science and information technology. Explore topics such as logic, set theory, combinatorics, graph theory, and formal languages. Engage in problem-solving exercises to enhance your logical reasoning and analytical skills. Uncover the mathematical foundations essential for algorithm design, cryptography, and database management. Whether you're a computer science enthusiast or a professional seeking to strengthen your mathematical toolkit, this course provides a solid foundation in Discrete Mathematics, empowering you to tackle complex computational challenges with confidence."
                            />
                        </div>
                        <div>
                            {/* <button class="github-button">CS 203</button> */}
                            <ClassCard
                                classId="CS203"
                                name="Data Structures"
                                text="Explore the fundamental concepts of data structures in this comprehensive course. Dive into the essential building blocks of organizing and managing data efficiently, covering topics such as arrays, linked lists, stacks, queues, trees, and graphs. Gain hands-on experience through practical implementations and problem-solving exercises, honing your skills in algorithmic thinking and computational efficiency. Understand the trade-offs involved in selecting and implementing different data structures based on specific use cases. Whether you're a beginner looking to grasp the basics or an experienced developer aiming to deepen your understanding, this course equips you with the essential knowledge to design robust and optimized algorithms for effective data manipulation."
                            />
                        </div>
                    </div>
                    <div>
                        {/* <button class="github-button">CS 207</button> */}
                        <ClassCard
                            classId="CS207"
                            name="Database and Information System"
                            text="Immerse yourself in the world of Database Management Systems (DBMS) with this comprehensive course. Gain a deep understanding of the core concepts and principles that underlie the design, implementation, and optimization of databases. Explore relational database models, normalization techniques, SQL language proficiency, and transaction management. Dive into practical aspects of schema design, indexing, and query optimization for efficient data retrieval. Learn about modern database technologies and trends, including NoSQL databases and distributed database systems. Through hands-on projects and real-world scenarios, acquire the skills needed to design, implement, and manage robust and scalable databases. Whether you're a beginner or a seasoned professional, this course equips you with the knowledge to excel in the dynamic field of Database Management."
                        />
                    </div>
                </center>
            </div>
        </div>
    );
}

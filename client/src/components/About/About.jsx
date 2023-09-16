import React from 'react';
import OurStory from './OurStory';
import '../../CSS/About.css';

const About = () => {
  return (
    <main>
        <div className='about-container'>
            <div className="title">
            <h1>About Us</h1>
            </div>

            <OurStory /> {/* Example of a potential separate component */}

            <div className="our-mission">
            <h3>Our Mission</h3>
                <p className='our-story'>At Swift Learnings, we are on a mission to revolutionize the way individuals approach learning and comprehension. We believe that education should be an adventure, a journey that sparks curiosity, fosters understanding, and leaves an indelible mark on the hearts and minds of learners worldwide. Through innovative technology and a passion for education, we strive to provide a platform that engages, challenges, and encourages every learner to reach their full potential.
                </p>
            </div>
            

            <div className="team-members">
                <img src={require('../../assets/Selfie.jpg')} alt="Team Member 1" className="Me" />
                <h3>Meet The Team</h3>
                <img src={require('../../assets/Corgi named Clause.png')} alt="Team Member 2" className="Quest" />
            </div>

            <div className="contact-us">
            <h3>Contact Us</h3>
            <p>gvill005@gmail.com | www.gpvdev.com</p>
            </div>
    </div>
    </main>
  )
}

export default About

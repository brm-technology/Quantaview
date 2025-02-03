import React from 'react';
import './Home.css'; 
import NewsTimeline from './News';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-box">
        <h1 className="home-title">Quantafuel Model Information</h1>
        <p className="home-description">
        This is for test.
        </p>
      </div>
     <NewsTimeline />
    </div>
  );
};

export default Home;

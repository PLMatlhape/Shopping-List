import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

const Home: React.FC = () => {
    const navigate = useNavigate();

    const handleMakeListClick = () => {

            <section className="hero">
                <div className="hero-content">
                    <h1>Organize Your<br />Perfect <span className="highlight">Shopping List</span><br />Effortlessly</h1>
                    <p>Create, manage, and organize your shopping lists to never forget essential items. Make grocery shopping simple and efficient for your family's needs.</p>
                    <div className="cta-buttons">

                        <div className="order-process">
                            <button className="play-btn" title="Play Order Process Video"></button>
                            Order Process
                        </div>
                    </div>
                </div>
                
                <div className="hero-image">
                    <div className="main-image"></div>
                    
                    {/* Floating Cards */}
                    <div className="floating-card rating-card">
                        <h4>Our Happy Customer</h4>
                        <div className="stars">⭐⭐⭐⭐⭐</div>
                        <div className="customer-count">4.9 (5k Review)</div>
                    </div>
                </div>
            </section>

            <Categories 
                onCategoryClick={handleCategoryClick}
                onSeeAllClick={handleSeeAllClick}
            />
        </main>
        </div>
    );
};



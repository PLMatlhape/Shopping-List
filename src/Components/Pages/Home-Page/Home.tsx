import React from 'react';
import './home.css';

const Home: React.FC = () => {
    return (
        <main className="container">
            <section className="hero">
                <div className="hero-content">
                    <h1>Organize Your<br />Perfect <span className="highlight">Shopping List</span><br />Effortlessly</h1>
                    <p>Create, manage, and organize your shopping lists to never forget essential items. Make grocery shopping simple and efficient for your family's needs.</p>
                    <div className="cta-buttons">
                        <button className="shop-btn">Make List</button>
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

            <section className="categories">
                <div className="section-header">
                    <h2>Popular Categories</h2>
                    <button className="see-all">See All →</button>
                </div>
                
                <div className="category-grid">
                    <div className="category-card">
                        <div className="category-icon meat-icon">
                            <img src="/Image/Meat.png" alt="Fresh Meat" />
                        </div>
                        <h3>Fresh Meat</h3>
                    </div>
                    
                    <div className="category-card">
                        <div className="category-icon pizza-icon">
                            <img src="/Image/Fast-Food.png" alt="Fast Food" />
                        </div>
                        <h3>Fast Food</h3>
                    </div>
                    
                    <div className="category-card">
                        <div className="category-icon nuts-icon">
                            <img src="/Image/Fruits-Veg.png" alt="Fruits & Vegetables" />
                        </div>
                        <h3>Fruits & Vegetables</h3>
                    </div>
                    
                    <div className="category-card">
                        <div className="category-icon spices-icon">
                            <img src="/Image/Spices.png" alt="Spices" />
                        </div>
                        <h3>Spices</h3>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;

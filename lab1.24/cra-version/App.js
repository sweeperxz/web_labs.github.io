import React, { useState } from 'react';
import './App.css';

// Классовый компонент для отображения информации о хобби
class ClassHobbyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetails: false,
            likes: 0
        };
    }
    
    toggleDetails = () => {
        this.setState(prevState => ({
            showDetails: !prevState.showDetails
        }));
    }
    
    addLike = () => {
        this.setState(prevState => ({
            likes: prevState.likes + 1
        }));
    }
    
    render() {
        return (
            <div className="hobby-card hobby-card-class">
                <h3>Класовий компонент</h3>
                <h4>Фотографія</h4>
                <p>
                    Фотографія - це мистецтво та практика створення зображень шляхом фіксації світла. 
                    Це хоббі дозволяє зберегти моменти життя та виразити своє творче бачення.
                </p>
                
                <button 
                    className="button purple-button" 
                    onClick={this.toggleDetails}
                >
                    {this.state.showDetails ? 'Приховати деталі' : 'Показати деталі'}
                </button>
                
                {this.state.showDetails && (
                    <div className="details">
                        <h4>Чому це цікаво:</h4>
                        <ul className="hobby-list">
                            <li>Розвиває творче мислення та пошук краси в буденних речах</li>
                            <li>Дозволяє експериментувати з різними жанрами та техніками</li>
                            <li>Можливість ділитись своїми роботами з іншими</li>
                            <li>Створення власних історій через візуальні образи</li>
                        </ul>
                    </div>
                )}
                
                <div className="like-container">
                    <button 
                        onClick={this.addLike}
                        className={`like-button ${this.state.likes > 0 ? 'active' : ''}`}
                    >
                        <span className="heart-icon">♥</span>
                    </button>
                    <span className="likes-count">
                        {this.state.likes} {this.state.likes === 1 ? 'вподобання' : 'вподобань'}
                    </span>
                </div>
            </div>
        );
    }
}

// Функциональный компонент для отображения информации о хобби
function FunctionalHobbyComponent() {
    const [showDetails, setShowDetails] = useState(false);
    const [skills, setSkills] = useState([
        { name: 'Початківець', active: true },
        { name: 'Середній', active: false },
        { name: 'Просунутий', active: false },
        { name: 'Експерт', active: false }
    ]);
    
    const toggleDetails = () => {
        setShowDetails(prev => !prev);
    };
    
    const setSkillLevel = (index) => {
        setSkills(prevSkills => {
            return prevSkills.map((skill, i) => {
                return { ...skill, active: i <= index };
            });
        });
    };
    
    return (
        <div className="hobby-card hobby-card-func">
            <h3>Функціональний компонент</h3>
            <h4>Програмування</h4>
            <p>
                Програмування - це процес створення програм та додатків за допомогою мов програмування.
                Це захоплююче хоббі, яке дозволяє втілювати свої ідеї в інтерактивні проекти.
            </p>
            
            <button 
                className="button blue-button" 
                onClick={toggleDetails}
            >
                {showDetails ? 'Приховати деталі' : 'Показати деталі'}
            </button>
            
            {showDetails && (
                <div className="details">
                    <h4>Переваги програмування як хоббі:</h4>
                    <ul className="hobby-list">
                        <li>Створення власних проектів та додатків</li>
                        <li>Постійне вивчення нових технологій</li>
                        <li>Вирішення логічних задач та головоломок</li>
                        <li>Можливість автоматизувати рутинні задачі</li>
                    </ul>
                </div>
            )}
            
            <div className="skills-container">
                <h4>Рівень навичок:</h4>
                <div className="skills-buttons">
                    {skills.map((skill, index) => (
                        <button 
                            key={skill.name}
                            onClick={() => setSkillLevel(index)}
                            className={`skill-button ${skill.active ? 'active' : ''}`}
                        >
                            {skill.name}
                        </button>
                    ))}
                </div>
                <p className="current-skill">
                    Поточний рівень: <strong>{skills.filter(s => s.active).pop().name}</strong>
                </p>
            </div>
        </div>
    );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Лабораторна робота 1.24 - React.js (CRA version)</h1>
      </header>
      <main className="App-main">
        <h2>Моє хоббі</h2>
        <p className="intro-text">
          Ця сторінка демонструє використання класового та функціонального компонентів React у версії Create React App.
        </p>
        <div className="hobby-container">
          <ClassHobbyComponent />
          <FunctionalHobbyComponent />
        </div>
      </main>
      <footer className="App-footer">
        <p>© 2023 Лабораторна робота з React.js</p>
        <a 
          href="../index.html" 
          className="back-link"
        >
          Повернутися на головну
        </a>
      </footer>
    </div>
  );
}

export default App; 
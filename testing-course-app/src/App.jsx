import { useState } from 'react';
import './App.css';
import LoginPage from './components/LoginPage';
import BuggyForm from './components/BuggyForm';
import RegistrationForm from './components/RegistrationForm';

function App() {
  const [activePage, setActivePage] = useState('login');

  return (
    <div className="app-container">
      <header>
        <h1>How to Write Bug Reports That Don't Suck</h1>
        <nav>
          <button 
            className={activePage === 'login' ? 'active' : ''} 
            onClick={() => setActivePage('login')}
          >
            Login Page
          </button>
          <button 
            className={activePage === 'form' ? 'active' : ''} 
            onClick={() => setActivePage('form')}
          >
            Contact Form
          </button>
          <button 
            className={activePage === 'registration' ? 'active' : ''} 
            onClick={() => setActivePage('registration')}
          >
            Registration
          </button>
        </nav>
      </header>

      <main>
        {activePage === 'login' ? (
          <div>
            <h2>Example 1: Mock Login Page</h2>
            <p className="description">
              This login page has an intentional UI bug: the submit button is not centered.
            </p>
            <LoginPage />
          </div>
        ) : activePage === 'form' ? (
          <div>
            <h2>Example 2: Buggy Contact Form</h2>
            <p className="description">
              This form has an intentional functional bug: it will throw an error when you try to submit it.
            </p>
            <BuggyForm />
          </div>
        ) : (
          <div>
            <h2>Example 3: Registration Form</h2>
            <p className="description">
              This registration form has an age validation requirement: users must be over 18 to register.
              Users who are 18 or younger cannot submit the form.
            </p>
            <RegistrationForm />
          </div>
        )}
      </main>
      
      <footer>
        <p>Created for How to Write Bug Reports That Don't Suck - 2025</p>
      </footer>
    </div>
  );
}

export default App;

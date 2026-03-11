import { useState } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import TaskList from './components/TaskList.jsx';
import CardList from './components/CardList.jsx';
import './App.css';

function App() {
  const [view, setView] = useState('task')

  const switchView = () => {
    setView(view === 'task' ? 'card' : 'task');
  }

  return (
    <div className="app">
      <Header title="Gestor de tareas" />
      <main className="main">
        <div className={`container-${view}`}>
          {view === 'task' ? (
            <TaskList name="Tareas de React"/>
          ) : (
            <CardList name="Tareas de React" />
          )}
        </div>
        <div className="container-switch-view">
          <button className='btn-swicht-view' onClick={switchView}>{`Cambiar vista a ${view === 'task' ? 'tarjetas' : 'lista'}`}</button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;

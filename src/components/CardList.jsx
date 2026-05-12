import { useState } from 'react';
import CardItem from './Card';
import { useCard } from '../hooks/useCard';
import './CardList.css';

function CardList({name}) {
  const {
    cards,
    addCard,
    toggleItem,
    deleteItem,
    setFitler,
    isLoading
  } = useCard();

  const [newCard, setNewCard] = useState('');

  const handleChage = (e) => {
    setNewCard(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addCard(newCard);
    setNewCard('');
  }

    return (
        <>
            <h2>Lista: {name}</h2>
            <div className="list">
              <button type="button" onClick={() => addCard('Nueva tarea')}>Nueva tarea</button>
            </div>
            <div className="list-form">
              <form className="list-form-input" onSubmit={handleSubmit}>
                <input 
                  className="list-form-input-text"
                  type="text" 
                  placeholder="Escribe una tarea..." 
                  value={newCard} 
                  onChange={handleChage} 
                />
                <button type="submit">Agregar</button>
              </form>
            </div>
            <div className="list-filters">
              <button onClick={() => setFitler('all')}>Todas</button>
              <button onClick={() => setFitler('pending')}>Pendientes</button>
              <button onClick={() => setFitler('completed')}>Completadas</button>
            </div>
            <div className="list-cards">
                {isLoading ? (
                  <p>Cargando tarjetas...</p>
                ) : (
                  cards.map((card) => (
                    <CardItem key={card.id} task={card} deleteItem={() => deleteItem(card.id)} toggleItem={() => toggleItem(card.id)}/>
                  ))
                )}
            </div>
        </>
    );
}

export default CardList;

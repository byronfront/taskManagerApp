import { useState, useEffect } from 'react';

export const useCard = () => {
  const [cards, setCards] = useState([]);
  const [fitler, setFitler] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = 'https://tasklistapi.vercel.app/tasks';

  useEffect(() => {
    async function startFetch() {
      setIsLoading(true);
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer react-students-token`,
        }
      })
      const data = await response.json();

      const formattedCards = data.map((card) => ({
        id: card.id,
        text: card.title,
        description: card.description,
        status: card.status,
        priority: card.priority,
        emoji: card.emoji,
      }));

      if(!ignore) {
        setCards(formattedCards);
        setIsLoading(false);
      }
    }
    let ignore = false;
    startFetch()
    return () => {
      ignore = true;
    };
  }, []); 

  const addCard = (text) => {
    if (typeof text !== 'string' || text.trim() === '') return;
    const newCard = {
      id: Date.now(),
      text: text.trim(),
      description: '',
      status: 'todo',
      priority: 'medium',
      emoji: '📝',
    };
    setCards((prev) => [...prev, newCard]);
  };

  const toggleItem = (id) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === id
          ? {
              ...card,
              status: card.status === 'done' ? 'todo' : 'done',
            }
          : card
      )
    );
  };

  const deleteItem = (id) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  const fileredCards = cards.filter((card) => {
    if (fitler === 'all') return true;
    if (fitler === 'pending') {
      return card.status === 'todo' || card.status === 'in-progress';
    }
    if (fitler === 'completed') return card.status === 'done';
    return true;
  });

  return { cards: fileredCards, setCards, addCard, toggleItem, deleteItem, setFitler, isLoading };
}
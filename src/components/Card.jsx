import './Card.css';

function CardItem({task, deleteItem, toggleItem}) {
  return (
    <div className="card-item-container">
      <div className="card-item-header">
        <span className= 'card-item-emoji'>{task.emoji}</span>
        <h3 className= 'card-item-title'>{task.text}</h3>
      </div>
      <div className="card-item-header-right">
        <button className="btn-card-delete" onClick={deleteItem}>X</button>
      </div>
      <p className= 'card-item-description'>{task.description}</p>
      <div className="card-item-meta">
        <span className= {`card-item-${task.priority}`}>{task.priority}</span>
        <span className= {`card-item-${task.status}`}>{task.status}</span>
      </div>
    </div>
  );
}

export default CardItem;
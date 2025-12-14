import React from 'react';

function ToDoItem({ task, index, onDelete, onMoveUp, onMoveDown, onToggle, tasksLength }) {
    
    const handleCheckboxChange = () => {
        onToggle(index);
    };

    const hasCreatedAt = task.createdAt && task.createdAt !== 'Invalid Date';

    const formatCreatedTime = (isoString) => {
        if (!isoString) return '--:--';
        try {
            const date = new Date(isoString);
            if (isNaN(date.getTime())) return '--:--';
            return date.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
        } catch {
            return '--:--';
        }
    };

    const formatCreatedDate = (isoString) => {
        if (!isoString) return 'Дата неизвестна';
        try {
            const date = new Date(isoString);
            if (isNaN(date.getTime())) return 'Дата неизвестна';
            
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (date.toDateString() === today.toDateString()) {
                return 'Сегодня';
            } else if (date.toDateString() === yesterday.toDateString()) {
                return 'Вчера';
            } else {
                return date.toLocaleDateString('ru-RU', {
                    day: '2-digit',
                    month: '2-digit'
                });
            }
        } catch {
            return 'Дата неизвестна';
        }
    };

    return (
        <li 
            key={index}
            style={{
                backgroundColor: task.completed ? '#f0f0f0' : 'white',
                marginBottom: '10px',
                padding: '15px',
                borderLeft: `5px solid ${task.completed ? '#9E9E9E' : '#4CAF50'}`,
                borderRadius: '6px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                opacity: task.completed ? 0.7 : 1
            }}>
            
            <div style={{ marginBottom: '8px' }}>
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px',
                    marginBottom: '5px'
                }}>
                    <input 
                        type="checkbox"
                        checked={task.completed}
                        onChange={handleCheckboxChange}
                        style={{
                            width: '18px',
                            height: '18px',
                            cursor: 'pointer'
                        }}
                    />
                    <span style={{
                        fontSize: '18px',
                        fontWeight: task.completed ? 'normal' : '500',
                        color: task.completed ? '#666' : '#333',
                        textDecoration: task.completed ? 'line-through' : 'none'
                    }}>
                        {index + 1}. {task.text}
                    </span>
                </div>
                
                {hasCreatedAt && (
                    <div style={{
                        fontSize: '12px',
                        color: '#666',
                        marginLeft: '28px',
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center'
                    }}>
                        <span style={{
                            backgroundColor: '#e8f5e9',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '11px'
                        }}>
                            📅 {formatCreatedDate(task.createdAt)} в {formatCreatedTime(task.createdAt)}
                        </span>
                        
                        <span style={{
                            color: '#888',
                            fontStyle: 'italic'
                        }}>
                            {getTimeAgo(task.createdAt)}
                        </span>
                    </div>
                )}
                
                {!hasCreatedAt && (
                    <div style={{
                        fontSize: '11px',
                        color: '#ff9800',
                        marginLeft: '28px',
                        fontStyle: 'italic'
                    }}>
                        ⚠ Время создания не сохранено
                    </div>
                )}
            </div>
            
            <div style={{
                display: 'flex',
                gap: '8px',
                justifyContent: 'flex-end'
            }}>
                {!task.completed && (
                    <>
                        <button
                            onClick={() => onMoveUp(index)}
                            disabled={index === 0}
                            style={{
                                padding: '6px 10px',
                                backgroundColor: '#2196F3',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '12px',
                                opacity: index === 0 ? 0.5 : 1
                            }}>
                            ⬆️
                        </button>
                        <button
                            onClick={() => onMoveDown(index)}
                            disabled={index === tasksLength - 1}
                            style={{
                                padding: '6px 10px',
                                backgroundColor: '#2196F3',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '12px',
                                opacity: index === tasksLength - 1 ? 0.5 : 1
                            }}>
                            ⬇️
                        </button>
                    </>
                )}
                
                <button
                    onClick={() => onDelete(index)}
                    style={{
                        padding: '6px 10px',
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px'
                    }}>
                    🗑️
                </button>
            </div>
        </li>
    );
}

function getTimeAgo(isoString) {
    if (!isoString) return 'неизвестно';
    try {
        const created = new Date(isoString);
        if (isNaN(created.getTime())) return 'неизвестно';
        
        const now = new Date();
        const diffMs = now - created;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);
        
        if (diffMins < 1) return 'только что';
        if (diffMins < 60) return `${diffMins} мин назад`;
        if (diffHours < 24) return `${diffHours} ч назад`;
        return `${diffDays} дн назад`;
    } catch {
        return 'неизвестно';
    }
}

export default ToDoItem;
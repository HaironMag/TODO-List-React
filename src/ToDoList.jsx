import React, { useState, useEffect } from 'react'
import ToDoItem from './ToDoItem';

function ToDoList() {
    const STORAGE_KEY = "todo-app-tasks";
    
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            const updatedTasks = parsed.map(task => {
                if (!task.createdAt) {
                    return { ...task, createdAt: new Date().toISOString() };
                }
                return task;
            });
            return updatedTasks;
        }
        return [
            { 
                text: "Принять собаку", 
                completed: false,
                createdAt: new Date().toISOString()
            },
            { 
                text: "Прогулка с завтраком", 
                completed: false,
                createdAt: new Date().toISOString()
            }
        ];
    });
    
    const [newTask, setNewTask] = useState("");
    const [showCompleted, setShowCompleted] = useState(false);

    const completedTasks = tasks.filter(task => task.completed);
    const activeTasks = tasks.filter(task => !task.completed);
    
    const tasksToShow = showCompleted ? completedTasks : activeTasks;

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks(t => [...t, { 
                text: newTask, 
                completed: false,
                createdAt: new Date().toISOString()
            }]);
            setNewTask("");
        }
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function moveTaskUp(index) {
        if(index > 0){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = 
            [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if(index < tasks.length - 1){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = 
            [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function toggleTaskCompletion(index) {
        const updatedTasks = tasks.map((task, i) => {
            if (i === index) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(updatedTasks);
    }

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]);

    function deleteAllTasks() {
        if (window.confirm("Вы уверены, что хотите удалить ВСЕ задачи? Это действие нельзя отменить.")) {
            setTasks([]);
            localStorage.removeItem(STORAGE_KEY);
        }
    }

    return (
        <div style={{
            maxWidth: '550px',
            margin: '40px auto',
            padding: '30px',
            border: 'none',
            borderRadius: '16px',
            backgroundColor: '#ffffff',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
            backdropFilter: 'blur(10px)'
        }}>
            <h1 style={{
                textAlign: 'center',
                color: '#5e72e4',
                marginBottom: '30px',
                fontSize: '32px',
                paddingBottom: '15px',
                background: 'linear-gradient(90deg, #5e72e4 0%, #825ee4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: '700',
                letterSpacing: '-0.5px'
            }}>
                📝 Мой Список Дел
            </h1>

            <div style={{
                display: 'flex',
                gap: '12px',
                marginBottom: '25px',
                alignItems: 'center'
            }}>
                <input 
                    type="text"
                    placeholder='Введите новую задачу...'
                    value={newTask}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    style={{
                        flex: 1,
                        padding: '14px 18px',
                        border: '1px solid #e0e6ff',
                        borderRadius: '10px',
                        fontSize: '16px',
                        backgroundColor: '#f8faff',
                        transition: 'all 0.3s ease',
                        outline: 'none',
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.04)'
                    }}
                    onFocus={(e) => {
                        e.target.style.borderColor = '#5e72e4';
                        e.target.style.boxShadow = '0 0 0 3px rgba(94, 114, 228, 0.1)';
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = '#e0e6ff';
                        e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.04)';
                    }}
                />
                <button
                    onClick={addTask}
                    style={{
                        padding: '14px 24px',
                        background: 'linear-gradient(135deg, #5e72e4 0%, #825ee4 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '16px',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 12px rgba(94, 114, 228, 0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 16px rgba(94, 114, 228, 0.35)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 12px rgba(94, 114, 228, 0.25)';
                    }}>
                    <span style={{ fontSize: '18px' }}>+</span> Добавить
                </button>
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '20px',
                alignItems: 'center'
            }}>
                <div style={{
                    display: 'flex',
                    gap: '10px'
                }}>
                    <button
                        onClick={() => setShowCompleted(false)}
                        style={{
                            padding: '10px 22px',
                            backgroundColor: showCompleted ? '#f0f2ff' : '#5e72e4',
                            color: showCompleted ? '#667eea' : 'white',
                            border: `1px solid ${showCompleted ? '#e0e6ff' : '#5e72e4'}`,
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '14px',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}
                        onMouseEnter={(e) => {
                            if (showCompleted) {
                                e.target.style.backgroundColor = '#e6ebff';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (showCompleted) {
                                e.target.style.backgroundColor = '#f0f2ff';
                            }
                        }}>
                        <span style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: showCompleted ? '#667eea' : '#ffffff'
                        }}></span>
                        Активные ({activeTasks.length})
                    </button>
                    <button
                        onClick={() => setShowCompleted(true)}
                        style={{
                            padding: '10px 22px',
                            backgroundColor: showCompleted ? '#5e72e4' : '#f0f2ff',
                            color: showCompleted ? 'white' : '#667eea',
                            border: `1px solid ${showCompleted ? '#5e72e4' : '#e0e6ff'}`,
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '14px',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}
                        onMouseEnter={(e) => {
                            if (!showCompleted) {
                                e.target.style.backgroundColor = '#e6ebff';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!showCompleted) {
                                e.target.style.backgroundColor = '#f0f2ff';
                            }
                        }}>
                        <span style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: showCompleted ? '#ffffff' : '#667eea'
                        }}></span>
                        Выполненные ({completedTasks.length})
                    </button>
                </div>
                
                <button
                    onClick={deleteAllTasks}
                    disabled={tasks.length === 0}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: tasks.length === 0 ? '#e0e0e0' : '#ff6b6b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: tasks.length === 0 ? 'not-allowed' : 'pointer',
                        fontWeight: '600',
                        fontSize: '14px',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                    onMouseEnter={(e) => {
                        if (tasks.length > 0) {
                            e.target.style.backgroundColor = '#ff5252';
                            e.target.style.transform = 'translateY(-1px)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (tasks.length > 0) {
                            e.target.style.backgroundColor = '#ff6b6b';
                            e.target.style.transform = 'translateY(0)';
                        }
                    }}>
                    <span>🗑️</span> Очистить все
                </button>
            </div>

            <div style={{
                marginTop: '25px',
                paddingTop: '20px',
                borderTop: '1px solid #f0f2ff'
            }}>
                <h3 style={{
                    color: '#555',
                    marginBottom: '15px',
                    fontSize: '14px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                }}>
                    {showCompleted ? 'Выполненные задачи' : 'Активные задачи'} 
                    <span style={{
                        marginLeft: '8px',
                        backgroundColor: showCompleted ? '#d1f7c4' : '#e6ebff',
                        color: showCompleted ? '#2e7d32' : '#5e72e4',
                        padding: '2px 10px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '600'
                    }}>
                        {tasksToShow.length}
                    </span>
                </h3>
                
                <ol style={{
                    listStyleType: 'none',
                    padding: 0,
                    margin: 0
                }}>
                    {tasksToShow.map((task, index) => {
                        const originalIndex = tasks.findIndex(t => t === task);
                        
                        return (
                            <ToDoItem
                                key={originalIndex}
                                task={task}
                                index={originalIndex}
                                onDelete={deleteTask}
                                onMoveUp={moveTaskUp}
                                onMoveDown={moveTaskDown}
                                onToggle={toggleTaskCompletion}
                                tasksLength={tasks.length}
                            />
                        );
                    })}
                    
                    {tasksToShow.length === 0 && (
                        <div style={{
                            textAlign: 'center',
                            padding: '40px 20px',
                            color: '#999',
                            backgroundColor: '#fafbff',
                            borderRadius: '10px',
                            border: '2px dashed #e0e6ff'
                        }}>
                            <div style={{ fontSize: '48px', marginBottom: '10px' }}>
                                {showCompleted ? '✅' : '📝'}
                            </div>
                            <p style={{ fontSize: '16px', margin: 0 }}>
                                {showCompleted 
                                    ? 'Здесь будут отображаться выполненные задачи' 
                                    : 'Добавьте свою первую задачу!'}
                            </p>
                        </div>
                    )}
                </ol>
            </div>
        </div>
    )
}

export default ToDoList
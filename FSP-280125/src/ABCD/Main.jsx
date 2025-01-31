import React, { useState } from 'react';
import { Button, Input, List, Card } from 'antd';

const Main = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddTask = () => {
    if (taskInput.trim() !== '') {
      setTasks([...tasks, taskInput]);
      setTaskInput('');
    }
  };

  const handleRemoveTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleEditTask = (index) => {
    setTaskInput(tasks[index]);
    setEditingIndex(index);
  };

  const handleSaveTask = () => {
    if (editingIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex] = taskInput;
      setTasks(updatedTasks);
      setTaskInput('');
      setEditingIndex(null);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
      }}
    >
      <Card
        style={{
          width: 400,
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          textAlign: 'center',
        }}
        title="To Do List"
      >
        <div style={{ marginTop: 20 }}>
          <Input
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Enter a new task"
            style={{ width: '70%', marginRight: 10 }}
          />
          <Button
            type="primary"
            onClick={editingIndex !== null ? handleSaveTask : handleAddTask}
          >
            {editingIndex !== null ? 'Save Task' : 'Add Task'}
          </Button>

          <List
            size="small"
            bordered
            dataSource={tasks}
            renderItem={(task, index) => (
              <List.Item
                actions={[
                  <Button type="link" onClick={() => handleEditTask(index)}>
                    Edit
                  </Button>,
                  <Button type="link" onClick={() => handleRemoveTask(index)}>
                    Remove
                  </Button>,
                ]}
              >
                {task}
              </List.Item>
            )}
            style={{ marginTop: 20 }}
          />
        </div>
      </Card>
    </div>
  );
};

export default Main;

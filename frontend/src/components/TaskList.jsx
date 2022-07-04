import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import Button from './Button';

function TaskList(props) {
  const { tasks, removeTask } = props;
  const { changeEdited, changeIsEditing } = useContext(Context);
  const [order, setOrder] = useState('id');
  const [tasksOrdered, setTasksOrdered] = useState(tasks);

  const orderArray = (targetId) => {
    let newArray;
    if (targetId === 'id') {
      newArray = tasks.sort((a, b) => {
        if (a[targetId] > b[targetId]) return 1;
        if (a[targetId] < b[targetId]) return -1;
        return 0;
      });
    } else {
      newArray = tasks.sort((a, b) => a[targetId].localeCompare(b[targetId]));
    }
    return newArray;
  };

  const handleClick = (e) => {
    e.preventDefault();
    const taskSelected = tasks.find((task) => task.id === Number(e.target.id));
    changeEdited(taskSelected);
    changeIsEditing(true);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    await removeTask(e.target.id);
  };

  const handleFilter = async (e) => {
    setOrder(e.target.id);
    const newArray = orderArray(e.target.id);
    setTasksOrdered(newArray);
  };

  useEffect(() => {
    const newArray = orderArray(order);
    setTasksOrdered(newArray);
  }, [tasks]);

  return (
    <table className="table w-75 mx-auto bg-white table-hover table-bordered text-center">
      <thead>
        <tr>
          <td
            style={{ width: "30%" }}
            role='button'
            onClick={(e) => handleFilter(e)}
            id="name"
          >
            { order === 'name'? '⇓' : null }Tarefa
          </td>
          <td
            style={{ width: "30%" }}
            role='button'
            onClick={(e) => handleFilter(e)}
            id="id"
          >
            { order === 'id'? '⇓' : null }Criado em
          </td>
          <td
            style={{ width: "30%" }}
            role='button'
            onClick={(e) => handleFilter(e)}
            id="status"
          >
            { order === 'status'? '⇓' : null }Status
          </td>
          <td style={{ width: "10%" }}>Editar</td>
          <td style={{ width: "10%" }}>Remover</td>
        </tr>
      </thead>
      <tbody>
        { tasksOrdered.length > 0 && tasksOrdered.map((task) => (
          <tr key={task.id}>
            <td data-testid="row-header">{ task.name }</td>
            <td>
              { new Date(task.createdAt).toLocaleString('pt-BR', { timeZone: 'America/Bahia' }) }
            </td>
            <td>{ task.status }</td>
            <td>
              <Button
                type="btn btn-warning btn-sm"
                text="E" 
                handleClick={handleClick}
                id={task.id}
              />
            </td>
            <td>
              <Button
                type="btn btn-danger btn-sm"
                text="X"
                handleClick={handleDelete}
                id={task.id}
              />
            </td>
          </tr>
        )) }
      </tbody>
    </table>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
  removeTask: PropTypes.func.isRequired,
};

export default TaskList;

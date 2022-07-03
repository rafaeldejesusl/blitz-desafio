import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import Button from './Button';

function TaskList(props) {
  const { tasks, removeTask } = props;
  const { changeEdited, changeIsEditing } = useContext(Context);

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

  return (
    <table>
      <thead>
        <tr>
          <td>Tarefa</td>
          <td>Criado em</td>
          <td>Status</td>
          <td>Editar</td>
          <td>Remover</td>
        </tr>
      </thead>
      { tasks.length > 0 && tasks.map((task) => (
        <tbody key={task.id}>
          <tr>
            <td>{ task.name }</td>
            <td>
              { new Date(task.createdAt).toLocaleString('pt-BR', { timeZone: 'America/Bahia' }) }
            </td>
            <td>{ task.status }</td>
            <td><Button text="E" handleClick={handleClick} id={task.id} /></td>
            <td><Button text="X" handleClick={handleDelete} id={task.id} /></td>
          </tr>
        </tbody>
      )) }
    </table>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
  removeTask: PropTypes.func.isRequired,
};

export default TaskList;

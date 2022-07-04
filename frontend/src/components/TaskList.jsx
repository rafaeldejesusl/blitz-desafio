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
    <table className="table w-75 mx-auto bg-white table-hover table-bordered text-center">
      <thead>
        <tr>
          <td style={{ width: "30%" }}>Tarefa</td>
          <td style={{ width: "30%" }}>Criado em</td>
          <td style={{ width: "30%" }}>Status</td>
          <td style={{ width: "10%" }}>Editar</td>
          <td style={{ width: "10%" }}>Remover</td>
        </tr>
      </thead>
      <tbody>
        { tasks.length > 0 && tasks.map((task) => (
          <tr key={task.id}>
            <td>{ task.name }</td>
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

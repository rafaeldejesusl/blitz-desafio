import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import Button from './Button';

function Form(props) {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('Pendente');
  const { saveTask, updateTask } = props;
  const { edited, isEditing, changeIsEditing } = useContext(Context);

  const cleanForm = () => {
    setName('');
    setStatus('Pendente');
  };

  const handleclick = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await updateTask(status, edited.id);
      changeIsEditing(false);
      cleanForm();
    } else {
      await saveTask(name, status);
      cleanForm();
    }
  };

  return (
    <form>
      <label htmlFor="name-input">
        Tarefa:
        <input
          type="text"
          id="name-input"
          name="name"
          value={isEditing ? edited.name : name}
          onChange={isEditing ? null : (e) => setName(e.target.value)}
        />
      </label>
      <label htmlFor="status-input">
        Status:
        <select
          name="status"
          id="status-input"
          onChange={(e) => setStatus(e.target.value)}
          value={status}
        >
          <option value="Pendente">Pendente</option>
          <option value="Em Andamento">Em Andamento</option>
          <option value="Pronto">Pronto</option>
        </select>
      </label>
      { isEditing
        ? <Button text="Editar Tarefa" handleClick={handleclick} id="edit-button" />
        : <Button text="Criar Tarefa" handleClick={handleclick} id="create-button" /> }
    </form>
  );
}

Form.propTypes = {
  saveTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default Form;

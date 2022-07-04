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
    <form className="d-flex justify-content-around w-50 mx-auto mb-4">
      <label htmlFor="name-input">
        Tarefa:
        <input
          type="text"
          className="form-control"
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
          className="form-select"
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
        ? <Button
          type="btn btn-outline-light h-50 align-self-end"
          text="Editar Tarefa" 
          handleClick={handleclick}
          id="edit-button"
        />
        : <Button
          type="btn btn-outline-light h-50 align-self-end"
          text="Criar Tarefa"
          handleClick={handleclick}
          id="create-button"
        /> }
    </form>
  );
}

Form.propTypes = {
  saveTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default Form;

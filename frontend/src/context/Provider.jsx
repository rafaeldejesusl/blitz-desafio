import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function TaskProvider({ children }) {
  const [isEditing, setIsEditing] = useState(false);
  const [edited, setEdited] = useState();

  const changeIsEditing = (bool) => {
    setIsEditing(bool);
  };

  const changeEdited = (object) => {
    setEdited(object);
  };

  const context = {
    isEditing,
    changeIsEditing,
    edited,
    changeEdited,
  };

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  );
}

TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TaskProvider;

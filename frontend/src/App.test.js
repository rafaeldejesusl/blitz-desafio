import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

describe('Ao renderizar a página', () => {
  test('contém o formulário', () => {
    render(<App />);
    const nameInput = screen.getByLabelText('Tarefa:');
    const statusInput = screen.getByLabelText('Status:');
    const submitButton = screen.getByRole('button', { name: 'Criar Tarefa' });
    expect(nameInput).toBeInTheDocument();
    expect(statusInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('contém a tabela', () => {
    render(<App />);
    const taskColumn = screen.getByRole('button', { name: 'Tarefa' });
    const createdAtColumn = screen.getByRole('button', { name: '⇓Criado em' });
    const statusColumn = screen.getByRole('button', { name: 'Status' });
    const editColumn = screen.getByRole('cell', { name: 'Editar' });
    const removeColumn = screen.getByRole('cell', { name: 'Remover' });

    expect(taskColumn).toBeInTheDocument();
    expect(createdAtColumn).toBeInTheDocument();
    expect(statusColumn).toBeInTheDocument();
    expect(editColumn).toBeInTheDocument();
    expect(removeColumn).toBeInTheDocument();
  });

});

describe('A página permite', () => {
  test('adicionar uma tarefa a lista', async () => {
    render(<App />);
    const nameInput = screen.getByLabelText('Tarefa:');
    const statusInput = screen.getByLabelText('Status:');
    const submitButton = screen.getByRole('button', { name: 'Criar Tarefa' });

    userEvent.type(nameInput, 'Programar');
    userEvent.selectOptions(statusInput, 'Pronto');
    userEvent.click(submitButton);

    const taskName = await screen.findByRole('cell', { name: 'Programar' });
    const taskStatus = await screen.findByRole('cell', { name: 'Pronto' });

    expect(taskName).toBeInTheDocument();
    expect(taskStatus).toBeInTheDocument();
  });

  test('editar uma tarefa da lista', async () => {
    render(<App />);
    const statusInput = screen.getByLabelText('Status:');
    const editButton = await screen.findByRole('button', { name: 'E' });

    userEvent.click(editButton);

    const submitButton = screen.getByRole('button', { name: 'Editar Tarefa' });

    userEvent.selectOptions(statusInput, 'Em Andamento');
    userEvent.click(submitButton);

    const taskStatus = await screen.findByRole('cell', { name: 'Em Andamento' });

    expect(taskStatus).toBeInTheDocument();
  });

  test('apagar uma tarefa da lista', async () => {
    render(<App />);
    const removeButton = await screen.findByRole('button', { name: 'X' });
    const taskName = screen.getByRole('cell', { name: 'Programar' });
    const taskStatus = screen.getByRole('cell', { name: 'Em Andamento' });

    userEvent.click(removeButton);
    
    await waitFor(() => {

      expect(taskName).not.toBeInTheDocument();
    });

    await waitFor(() => {
  
      expect(taskStatus).not.toBeInTheDocument();
    });

  });
});

describe('A página permite organização', () => {
  test('inicial por ordem de criação', async () => {
    render(<App />);
    const nameInput = screen.getByLabelText('Tarefa:');
    const statusInput = screen.getByLabelText('Status:');
    const submitButton = screen.getByRole('button', { name: 'Criar Tarefa' });

    userEvent.type(nameInput, 'Programar');
    userEvent.selectOptions(statusInput, 'Pendente');
    userEvent.click(submitButton);
    userEvent.clear(nameInput);
    userEvent.type(nameInput, 'Estudar');
    userEvent.selectOptions(statusInput, 'Em Andamento');
    userEvent.click(submitButton);
    userEvent.clear(nameInput);
    userEvent.type(nameInput, 'Dormir');
    userEvent.selectOptions(statusInput, 'Pronto');
    userEvent.click(submitButton);

    const rowHeaders = await screen.findAllByTestId('row-header');

    expect(rowHeaders[0]).toHaveTextContent('Programar');
    expect(rowHeaders[1]).toHaveTextContent('Estudar');
    expect(rowHeaders[2]).toHaveTextContent('Dormir');
  });

  test('por ordem do nome da tarefa', async () => {
    render(<App />);
    const taskColumn = screen.getByRole('button', { name: 'Tarefa' });

    userEvent.click(taskColumn);

    const rowHeaders = await screen.findAllByTestId('row-header');

    expect(rowHeaders[0]).toHaveTextContent('Dormir');
    expect(rowHeaders[1]).toHaveTextContent('Estudar');
    expect(rowHeaders[2]).toHaveTextContent('Programar');
  });

  test('por ordem do status da tarefa', async () => {
    render(<App />);
    const statusColumn = screen.getByRole('button', { name: 'Status' });

    userEvent.click(statusColumn);

    const rowHeaders = await screen.findAllByTestId('row-header');

    expect(rowHeaders[0]).toHaveTextContent('Estudar');
    expect(rowHeaders[1]).toHaveTextContent('Programar');
    expect(rowHeaders[2]).toHaveTextContent('Dormir');
  });

  test('por ordem de criação da tarefa', async () => {
    render(<App />);
    const createdAtColumn = screen.getByRole('button', { name: '⇓Criado em' });

    userEvent.click(createdAtColumn);

    const rowHeaders = await screen.findAllByTestId('row-header');

    expect(rowHeaders[0]).toHaveTextContent('Programar');
    expect(rowHeaders[1]).toHaveTextContent('Estudar');
    expect(rowHeaders[2]).toHaveTextContent('Dormir');

    const removeButton = await screen.findAllByRole('button', { name: 'X' });

    userEvent.click(removeButton[0]);

    userEvent.click(removeButton[1]);

    userEvent.click(removeButton[2]);

    await waitFor(() => {

      expect(rowHeaders[2]).not.toBeInTheDocument();
    });

    render(<App />);
  });
});



import { expect } from 'chai';
import { ResultSetHeader } from 'mysql2';
import sinon from 'sinon';
import connection from '../../src/models/connection';
import TaskModel from '../../src/models/task.model';

describe('Cria uma nova tarefa', () => { 

  describe('quando é inserido com sucesso', async () => {

    it('retorna um objeto com "id", "name", "createdAt", "status"', async () => {
      const model = new TaskModel(connection);
      const execute: ResultSetHeader = { constructor: {
          name: 'ResultSetHeader'
        },
        affectedRows: 0,
        fieldCount: 0,
        info: '0',
        insertId: 1,
        serverStatus: 0,
        warningStatus: 0,
      };

      sinon.stub(connection, 'execute').resolves([execute, []]);
      
      const response = await model.create({ name: 'name', createdAt: new Date(), status: 'ativo' });

      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('name');
      expect(response).to.have.a.property('createdAt');
      expect(response).to.have.a.property('status');
    });

  });

});
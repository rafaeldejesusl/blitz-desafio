import chai from 'chai';
import { before } from 'mocha';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp from 'chai-http';

import app from '../src/index';
import connection from '../src/models/connection';
import TaskModel from '../src/models/task.model';
import { ResultSetHeader } from 'mysql2';

chai.use(chaiHttp);

const { expect } = chai;

const model = new TaskModel(connection);

describe('Quando é feita a requisição', () => {
  before(() => {
    const execute: ResultSetHeader = { constructor: {
        name: 'ResultSetHeader'
      },
      affectedRows: 1,
      fieldCount: 0,
      info: '0',
      insertId: 0,
      serverStatus: 0,
      warningStatus: 0,
    };

    sinon.stub(connection, 'execute').resolves([execute, []]);
    sinon.stub(model, 'findById').resolves([{ id: 1, name: 'algo', createdAt: new Date(), status: 'ativo'}]);
  });

  after(() => {
    (connection.execute as sinon.SinonStub).restore();
    (model.findById as sinon.SinonStub).restore();
  });

  it('Método delete /tasks/:id', async () => {
    const response = await chai.request(app).delete('/tasks/1');
    expect(response.noContent).to.be.true;
  })
})

describe('Quando é feita a requisição', () => {
  before(() => {
    sinon.stub(model, 'findById').resolves([]);
  });

  after(() => {
    (model.findById as sinon.SinonStub).restore();
  });

  it('Método delete /tasks/:id com id não existente', async () => {
    const response = await chai.request(app).delete('/tasks/1');
    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.eql({ message: 'Esta tarefa não existe' });
  })
})
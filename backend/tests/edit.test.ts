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

  it('Método put /tasks/:id', async () => {
    const response = await chai.request(app).put('/tasks/1').send({ status: 'Pendente' });
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

  it('Método put /tasks/:id com id não existente', async () => {
    const response = await chai.request(app).put('/tasks/1').send({ status: 'Pendente' });
    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.eql({ message: 'Esta tarefa não existe' });
  })
})

describe('Quando é feita a requisição', () => {
  before(() => {
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
    sinon.stub(model, 'findByName').resolves([{ id: 1, name: 'algo', createdAt: new Date(), status: 'ativo'}]);
  });

  after(() => {
    (connection.execute as sinon.SinonStub).restore();
    (model.findByName as sinon.SinonStub).restore();
  });

  it('Método put /tasks/:id com status inválido', async () => {
    const response = await chai.request(app).put('/tasks/:id').send({ status: 'Ativo' });
    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.eql({ message: 'Status inválido' });
  })
})
import chai from 'chai';
import { before } from 'mocha';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp from 'chai-http';

import app from '../src/index';
import connection from '../src/models/connection';
import TaskModel from '../src/models/task.model';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

chai.use(chaiHttp);

const { expect } = chai;

const model = new TaskModel(connection);

describe('Quando é feita a requisição', () => {
  let clock: any;
  const time = new Date();

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

    clock = sinon.useFakeTimers(time.getTime());
    sinon.stub(connection, 'execute').resolves([execute, []]);
    sinon.stub(model, 'findByName').resolves([]);
  });

  after(() => {
    (connection.execute as sinon.SinonStub).restore();
    (model.findByName as sinon.SinonStub).restore();
    clock.restore();
  });

  it('Método post /tasks', async () => {
    const response = await chai.request(app).post('/tasks').send({ name: 'algo', status: 'Pendente' });
    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.eql({ id: 1, name: 'algo', createdAt: time.toJSON(), status: 'Pendente' });
  })
})

describe('Quando é feita a requisição', () => {
  before(() => {
    const execute =  {
      id: 1,
      name: 'algo',
      createdAt: new Date(),
      status: 'ativo',
    }

    sinon.stub(model, 'findByName').resolves([execute]);
  });

  after(() => {
    (model.findByName as sinon.SinonStub).restore();
  });

  it('Método post /tasks com nome já existente', async () => {
    const response = await chai.request(app).post('/tasks').send({ name: 'algo', status: 'Pendente' });

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.eql({ message: 'Esta tarefa já existe' });
  })
})

describe('Quando é feita a requisição', () => {
  let clock: any;
  const time = new Date();

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

    clock = sinon.useFakeTimers(time.getTime());
    sinon.stub(connection, 'execute').resolves([execute, []]);
    sinon.stub(model, 'findByName').resolves([{ id: 1, name: 'algo', createdAt: new Date(), status: 'ativo'}]);
  });

  after(() => {
    (connection.execute as sinon.SinonStub).restore();
    (model.findByName as sinon.SinonStub).restore();
    clock.restore();
  });

  it('Método post /tasks com status inválido', async () => {
    const response = await chai.request(app).post('/tasks').send({ name: 'algo', status: 'Ativo' });
    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.eql({ message: 'Status inválido' });
  })
})
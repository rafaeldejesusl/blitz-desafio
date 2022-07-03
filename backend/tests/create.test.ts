import chai from 'chai';
import { before } from 'mocha';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp from 'chai-http';

import app from '../src/index';
import connection from '../src/models/connection';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

chai.use(chaiHttp);

const { expect } = chai;

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
    const execute1 = [] as RowDataPacket[];

    clock = sinon.useFakeTimers(time.getTime());
    const mock = sinon.stub(connection, 'execute');
    mock.onCall(0).resolves([execute1, []]);
    mock.onCall(1).resolves([execute, []])
  });

  after(() => {
    (connection.execute as sinon.SinonStub).restore();
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
    } as RowDataPacket;

    sinon.stub(connection, 'execute').resolves([[execute], []]);
  });

  after(() => {
    (connection.execute as sinon.SinonStub).restore();
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
    const execute = [] as RowDataPacket[];

    sinon.stub(connection, 'execute').resolves([execute, []]);
  });

  after(() => {
    (connection.execute as sinon.SinonStub).restore();
  });

  it('Método post /tasks com status inválido', async () => {
    const response = await chai.request(app).post('/tasks').send({ name: 'algo', status: 'Ativo' });
    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.eql({ message: 'Status inválido' });
  })
})
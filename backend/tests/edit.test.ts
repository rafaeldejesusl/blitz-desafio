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
    const execute1 = { id: 1, name: 'algo', createdAt: new Date(), status: 'ativo'} as RowDataPacket;

    const mock = sinon.stub(connection, 'execute');
    mock.onCall(0).resolves([[execute1], []]);
    mock.onCall(1).resolves([execute, []])
  });

  after(() => {
    (connection.execute as sinon.SinonStub).restore();
  });

  it('Método put /tasks/:id', async () => {
    const response = await chai.request(app).put('/tasks/1').send({ status: 'Pendente' });
    expect(response.noContent).to.be.true;
  })
})

describe('Quando é feita a requisição', () => {
  before(() => {
    const execute = [] as RowDataPacket[];

    sinon.stub(connection, 'execute').resolves([execute, []]);
  });

  after(() => {
    (connection.execute as sinon.SinonStub).restore();
  });

  it('Método put /tasks/:id com id não existente', async () => {
    const response = await chai.request(app).put('/tasks/1').send({ status: 'Pendente' });
    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.eql({ message: 'Esta tarefa não existe' });
  })
})

describe('Quando é feita a requisição', () => {
  before(() => {
    const execute = { id: 1, name: 'algo', createdAt: new Date(), status: 'ativo'} as RowDataPacket;

    sinon.stub(connection, 'execute').resolves([[execute], []]);
  });

  after(() => {
    (connection.execute as sinon.SinonStub).restore();
  });

  it('Método put /tasks/:id com status inválido', async () => {
    const response = await chai.request(app).put('/tasks/:id').send({ status: 'Ativo' });
    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.eql({ message: 'Status inválido' });
  })
})
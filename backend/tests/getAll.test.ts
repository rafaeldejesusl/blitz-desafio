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
  const time = new Date();
  before(() => {
    const execute = {
      id: 1,
      name: 'algo',
      createdAt: time,
      status: 'ativo',
    } as RowDataPacket;

    sinon.stub(connection, 'execute').resolves([[execute], []]);
  });

  after(() => {
    (connection.execute as sinon.SinonStub).restore();
  });

  it('Método get /tasks', async () => {
    const response = await chai.request(app).get('/tasks');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.eql([{ id: 1, name: 'algo', createdAt: time.toJSON(), status: 'ativo' }]);
  })
})
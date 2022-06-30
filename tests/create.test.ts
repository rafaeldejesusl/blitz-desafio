import chai from 'chai';
import { before } from 'mocha';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp from 'chai-http';

import app from '../src/index';
import connection from '../src/models/connection';
import { ResultSetHeader } from 'mysql2';

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

    clock = sinon.useFakeTimers(time.getTime());
    sinon.stub(connection, 'execute').resolves([execute, []]);
  });

  after(() => {
    (connection.execute as sinon.SinonStub).restore();
    clock.restore();
  });

  it('Método post /tasks', async () => {
    const response = await chai.request(app).post('/tasks').send({ name: 'algo', status: 'ativo' });
    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.eql({ id: 1, name: 'algo', createdAt: time.toJSON(), status: 'ativo' });
  })
})
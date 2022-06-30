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
  });

  after(() => {
    (connection.execute as sinon.SinonStub).restore();
  });

  it('Método delete /tasks/:id', async () => {
    const response = await chai.request(app).delete('/tasks/1');
    expect(response.noContent).to.be.true;
  })
})
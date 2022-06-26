import { expect } from "chai";
import sinon from "sinon";
import connection from "../../src/models/connection";
import TaskModel from "../../src/models/task.model";
import TaskService from "../../src/services/task.service";

describe('Ao chamar o service de create', () => {

  describe('quando inserido com sucesso', async () => {

    it('retorna um objeto com "id", "name", "createdAt", "status"', async () => {
      const model = new TaskModel(connection)
      const service = new TaskService(model);
      const execute = {
        id: 1,
        name: 'name',
        createdAt: new Date(),
        status: 'ativo',
      };

      sinon.stub(model, 'create').resolves(execute);

      const response = await service.create({ name: 'name', createdAt: new Date(), status: 'ativo' });

      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('name');
      expect(response).to.have.a.property('createdAt');
      expect(response).to.have.a.property('status');
    });

  });

});

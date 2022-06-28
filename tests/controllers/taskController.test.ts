import sinon from "sinon";
import { expect } from "chai";
import TaskModel from "../../src/models/task.model";
import connection from "../../src/models/connection";
import TaskService from "../../src/services/task.service";
import TaskContoller from "../../src/controllers/task.controller";

describe('Ao chamar o controller de create', () => {

  describe('quando inserido corretamente', () => {
    const model = new TaskModel(connection);
    const service = new TaskService(model);
    const controller = new TaskContoller(service);
    const response: any = {};
    const request: any = {};
    request.body = { name: 'algo', status: 'ativo' }

    const execute = {
      id: 1,
      name: 'algo',
      createdAt: new Date(),
      status: 'ativo',
    }

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns(execute);

    sinon.stub(service, 'create').resolves(execute);

    it('é chamado o código 201', async () => {
      await controller.create(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    })

    it('é chamado o json com o objeto da tarefa', async () => {
      await controller.create(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    })

  });

})
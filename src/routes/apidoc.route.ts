import {Router} from 'express';
import Route from '../interfaces/routes.interface';
import * as swaggerUI from 'swagger-ui-express'
import * as YAML from 'yamljs';

class ApiDocRoute implements Route {
  public path = '/api-docs';
  public router = Router();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(this.path, swaggerUI.serve);
    this.router.get(this.path, swaggerUI.setup(YAML.load('./swagger.yaml')));
  }
}

export default ApiDocRoute;

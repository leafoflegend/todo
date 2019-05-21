import { RouterModule } from 'nest-router';
import HealthModule from './health/index';

const routes = [
  {
    path: '/api',
    children: [
      {
        path: '/',
        module: HealthModule,
      },
    ],
  },
];

const ConfiguredRouterModule = RouterModule.forRoutes(routes);

export default ConfiguredRouterModule;

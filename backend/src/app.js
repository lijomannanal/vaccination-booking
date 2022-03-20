import Express from 'express';
import compression from 'compression';
import cors from 'cors';
import bodyParser from 'body-parser';
import AppointmentRouter from './routes/AppointmentRouter';
import CenterRouter from './routes/CenterRouter';
import SlotsRouter from './routes/SlotsRouter';
import globalErrorHandler from './config/globalErrorHandler';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerOptions from './config/swagger';
const swaggerSpec = swaggerJSDoc(swaggerOptions);

const App = Express();

App.use(compression());
App.use(cors());
App.use(bodyParser.json());
App.use(bodyParser.urlencoded( { extended: true } ));
App.use('/appointments', AppointmentRouter);
App.use('/centers', CenterRouter);
App.use('/slots', SlotsRouter);
App.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
App.use(globalErrorHandler);



export default App;
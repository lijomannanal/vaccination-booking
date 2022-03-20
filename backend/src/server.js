import 'dotenv/config';
import App from './app';
const MAX_RETRY = 20;
const { PORT = 8080, TEST_PORT } = process.env;
import Logger from './config/logger';
const LOG = new Logger('server.js');


const startApplication = async (retryCount) => {
  try {
    const port = process.env.NODE_ENV === 'test' ? TEST_PORT : PORT;
    App.listen(port, () => {
      LOG.info(`Application started at http://localhost:${port}`);
    });

  } catch (e) {
    LOG.error(e);
    const nextRetryCount = retryCount - 1;
    if (nextRetryCount > 0) {
      setTimeout(async () => await startApplication(nextRetryCount), 3000);
      return;
    }

    LOG.error('Unable to start application');
  }
};

startApplication(MAX_RETRY);

export default App;
import express from 'express';
import routes from './routes/index';

const app = express();
const port = 3000;

app.use('/api', routes);

app.listen(port, (): void => {
    console.log(`Server started at http://localhost:${port}/api`);
});

export default app;

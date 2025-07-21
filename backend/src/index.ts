import app from './app';
import connectDB from './config/db';
import config from './config/config';

connectDB();

app.listen(config.port, () => {
  console.log(`✅ Server running at http://localhost:${config.port}`);
  console.log('Swagger docs on http://localhost:5000/api-docs');

});

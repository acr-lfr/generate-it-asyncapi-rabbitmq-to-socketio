import 'generate-it-logger';
import app from '@/app';
import appCli from '@/app.cli';
import config from '@/config';
import packageJson from './package.json';
import { Server } from 'socket.io';

const port = appCli().port || config.port;

app()
  .then((io: Server) => {
    // Server listening on PORT
    io.listen(port);
    console.log(`${packageJson.name} socket-io listening on port ${port}`);
  }).catch((err: any) => {
    console.error(err);
  }
);

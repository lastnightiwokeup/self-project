// import express from 'express';
// import morgan from 'morgan';
// import helmet from 'helmet';

// // import polyussoRouter from '../routes/controllers/polyusso';
// // import spaRouter from '../routes/controllers/spa';
// // import { handleError, logError } from '../routes/middlewares/error';

// // import pingRouter from '../routes/controllers/api/ping';
// // import refreshRouter from '../routes/controllers/api/refresh';

// // import meRouter from '../routes/controllers/api/me';
// // import roleRouter from '../routes/controllers/api/role';
// // import vCardUserRouter from '../routes/controllers/api/vcarduser';
// // import vCardsRouter from '../routes/controllers/api/vcards';
// // import businessCardSubmissionRouter from '../routes/controllers/api/businessCardSubmission';
// // import requestEmailRouter from '../routes/controllers/api/requestEmail';
// // import notfoundRouter from '../routes/controllers/api/notfound';

// // import sessionMiddleware from './session/

// function initHelmet(app: express.Express) {

//   // Customize helmet filters to meet web security scan requirement
//   // app.use(helmet());
//   app.use(helmet.contentSecurityPolicy({
//     useDefaults: true,
//     directives: {
//       imgSrc: ["'self'", "data:", "blob:"],
//     }
//   }));
//   app.use(helmet.dnsPrefetchControl());
//   app.use(helmet.expectCt());
//   app.use(helmet.frameguard());
//   app.use(helmet.hidePoweredBy());
//   app.use(helmet.hsts());
//   app.use(helmet.ieNoOpen());
//   app.use(helmet.noSniff());
//   app.use(helmet.permittedCrossDomainPolicies());
//   app.use(helmet.referrerPolicy());

//   // Web Security Scan report suggested not sending setting this header at all
//   // app.use(helmet.xssFilter());
// }
// const expressApp = express();

// initHelmet(expressApp);

// expressApp.use(express.json());
// expressApp.use(express.urlencoded({ extended: false }));
// expressApp.use(sessionMiddleware);

// // All API requests require active session
// expressApp.use('/api', requireActiveSession);

// // Handle API requests
// expressApp.use('/api/ping', pingRouter);
// expressApp.use('/api/refresh', extendActiveSession, refreshRouter);
// expressApp.use('/api/me', extendActiveSession, meRouter);
// expressApp.use('/api/role', extendActiveSession, requireRole([RoleLabel.User]), roleRouter);
// expressApp.use('/api/vcarduser', extendActiveSession, requireRole([RoleLabel.User]), vCardUserRouter);
// expressApp.use('/api/vcards', extendActiveSession, requireRole([RoleLabel.User]), vCardsRouter);
// expressApp.use('/api/businessCardSubmission', extendActiveSession, requireRole([RoleLabel.User]), businessCardSubmissionRouter);
// expressApp.use('/api/requestEmail', extendActiveSession, requireRole([RoleLabel.User]), requestEmailRouter);

// // Special output should be returned if no API endpoints matched.
// expressApp.use('/api', notfoundRouter);

// // error handler
// expressApp.use('/api', handleError);

// // handle every other route with index.html, which will contain
// // a script tag to your application's JavaScript file(s).
// expressApp.use(polyussoRouter);
// expressApp.use(spaRouter);

// // error handler
// expressApp.use(logError);

// export default expressApp;

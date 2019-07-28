import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { persistStore } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import rootSaga from "./rootSaga";
import rootReducer from "./rootReducer";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
  );
  
  
  export const persistor = persistStore(store);
  
  sagaMiddleware.run(rootSaga);
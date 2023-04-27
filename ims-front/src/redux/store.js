import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import createSagaMiddleware from "@redux-saga/core";
import userSaga from "./login/userSaga";
import rootSaga from "./rootSaga";
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: rootReducer,
  middleware: () => [sagaMiddleware],
});
sagaMiddleware.run(rootSaga);
export default store;

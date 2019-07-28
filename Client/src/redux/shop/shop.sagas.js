import { takeLatest, call, put, all } from "redux-saga/effects";
import {
  firestore,
  convertCollectionsSnapshoptToMap
} from "../../firebase/firebase.utils";
import {
  fetchCollectionsFailure,
  fetchCollectionsSuccess
} from "./shop.actions";

import ShopActionTypes from "./shop.types";

export function* fetchCollectionAsync() {
  try {
    const collectionRef = firestore.collection("collections");
    const snapshopt = yield collectionRef.get();
    const collectionsMap = yield call(
      convertCollectionsSnapshoptToMap,
      snapshopt
    );
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionAsync
  );
}

export function* shopSagas() {
  yield all([call(fetchCollectionsStart)]);
}

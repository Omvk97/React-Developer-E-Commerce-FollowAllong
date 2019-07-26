import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CollectionsOverview from "../../components/collections_overview/CollectionsOverview.component";
import CollectionPage from "../collectionpage/CollectionPage.component";
import {
  firestore,
  convertCollectionsSnapshoptToMap
} from "../../firebase/firebase.utils";
import { updateCollections } from "../../redux/shop/shop.actions";
import WithSpinner from "../../components/with_spinner/WithSpinner.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

function Shop({ match, updateCollections }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const collectionRef = firestore.collection("collections");

    collectionRef.onSnapshot(async snapshopt => {
      const collectionsMap = convertCollectionsSnapshoptToMap(snapshopt);
      updateCollections(collectionsMap);
      setLoading(false);
    });
  }, [updateCollections]);

  return (
    <div className="shop-page">
      <Route
        exact
        path={`${match.path}`}
        render={props => (
          <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
        )}
      />
      <Route
        path={`${match.path}/:collectionId`}
        render={props => (
          <CollectionPageWithSpinner isLoading={loading} {...props} />
        )}
      />
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap =>
    dispatch(updateCollections(collectionsMap))
});

export default connect(
  null,
  mapDispatchToProps
)(Shop);

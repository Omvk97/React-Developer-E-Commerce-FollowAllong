import React, { useState } from "react";
import shopData from "./shop.data";

import CollectionPreview from "../../components/collection_preview/CollectionPreview.component";

function Shop() {
  const [collections, setCollections] = useState(shopData);
  return (
    <div className="shop-page">
      {collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
  );
}

export default Shop;

import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import MenuItem from "../menu_item/MenuItem.component";
import { selectDirectorySections } from "../../redux/directory/directory.selectors";

import "./Directory.styles.scss";

function Directory({ sections }) {
  return (
    <div className="directory-menu">
      {sections.map(({ id, ...otherSecionProps }) => (
        <MenuItem key={id} {...otherSecionProps} />
      ))}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
});

export default connect(mapStateToProps)(Directory);

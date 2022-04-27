import React from "react";

/** A component that shows the empty appointment slot
 * with an add button */
export default function Empty(props) {
  const { handleAdd } = props;
  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={handleAdd}
      />
    </main>
  );
}
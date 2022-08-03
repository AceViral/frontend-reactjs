import React from "react";
import "./Count.scss";
function Count({ count }) {
   return (
      <div className="count">
         <p>{count}</p>
      </div>
   );
}

export default Count;

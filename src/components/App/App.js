import React from "react";
import CommentWithHooks from "components/CommentWithHooks/CommentWithHooks";
import CommentWithCustomHook from "components/CommentWithCustomHook/CommentWithCustomHook";

const App = () => (
  <div>
    <h3>Comment With Hooks</h3>
    <CommentWithHooks />

    <h3>Comment With Custom Hook</h3>
    <CommentWithCustomHook />
  </div>
);

export default App;

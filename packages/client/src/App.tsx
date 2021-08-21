import type { Component } from "solid-js";

const App: Component = () => {
  loadData();
  return (
    <div id="Main"></div>
  );
};

const loadData = () => {
  fetch('/api/data')
      .then(x => x.json())
      .then(files => {
          console.log(files);
          document
              .querySelector('#Main')
              .innerHTML = files.reduce((res, file) => res + `<p>${file}</p>`, '');
      });
}

export default App;

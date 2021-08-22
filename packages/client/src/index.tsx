import { render } from "solid-js/web";
import { PresentationContextProvider } from './context/presentation';
import App from "./App";

import "./index.css";

const Index = () => {
    return (
        <PresentationContextProvider>
            <App />
        </PresentationContextProvider>
    );
};

render(Index, document.getElementById("root"));

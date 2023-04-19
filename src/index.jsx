import { createRoot } from 'react-dom/client'; 
import { MainView } from './components/main-view/main-view';
import './index.scss';

//main comp
const App = () => { 
    return <MainView />;
};

//find root of the app
const container = document.querySelector('#root');
const root = createRoot(container);

//React will render app in root DOM element
root.render(<App/>);
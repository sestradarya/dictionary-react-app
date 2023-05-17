import { BrowserRouter } from 'react-router-dom';
import './App.css';
import PageButtons from './components/PageButtons';
import Search from './components/Search';
import { Pages } from './pages/Pages';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <PageButtons />
        <Pages />
      </BrowserRouter>
    </div>
  );
}

export default App;

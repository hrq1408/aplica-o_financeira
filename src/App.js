import './App.css';
import Header from './components/Header';
import RoutesApli from './routes/BancoRoutes';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <div className="App">
      <Header />     
      <RoutesApli /> 
    </div>
  );
}

export default App;

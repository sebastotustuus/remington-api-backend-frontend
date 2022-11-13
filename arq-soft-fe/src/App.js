import './App.css';
import HeaderView from './components/Header';
import ProductsTable from './components/Table';

function App() {
  return (
    <div className="App">
      <div className="table-container">
        <HeaderView />
        <ProductsTable />
      </div>
    </div>
  );
}

export default App;

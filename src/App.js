import 'normalize.css';
import './App.scss';

// Components
import Header from './components/header/header';
import CreatePage from './components/createPage/createPage';

function App() {
	return (
		<div className="App">
			<Header />
			<CreatePage />
		</div>
	);
}

export default App;

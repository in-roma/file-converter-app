import 'normalize.css';
import './App.scss';

// Components
import Header from './components/header/header';
import MainPage from './components/mainPage/mainPage';

function App() {
	return (
		<div className="App">
			<Header />
			<MainPage />
		</div>
	);
}

export default App;

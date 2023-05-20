import { Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Profile from './pages/UserPage/Profile';
import NavMenu from './pages/Navbar/NavMenu';
import { ThemeProvider } from '@mui/material/styles';
import { AddText } from './pages/AddText';
import { MainPage } from './pages/MainPage/MainPage';
import { darkTheme } from './components/styles';
import { LoginRegisterPage } from './pages/LoginAndRegisterPage/LoginPage';
import { PostPage } from './pages/PostPage/PostPage';

const App = () => {
	return (
		<ThemeProvider theme={darkTheme}>
			<NavMenu />
			<Routes>
				<Route path='/' element={<MainPage />} />
				<Route path='About' element={<About />} />
				<Route path='Login' element={<LoginRegisterPage />} />
				<Route path='AddText' element={<AddText />} />
				<Route path='Post/:postId' element={<PostPage />} />
				<Route path='/:userLogin' element={<Profile />} />
				<Route
					path='*'
					element={
						<main style={{ padding: '1rem' }}>
							<p>There's nothing here!</p>
						</main>
					}
				/>
			</Routes>
		</ThemeProvider>
	);
};

export default App;

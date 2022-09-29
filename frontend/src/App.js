import { useMediaQuery } from '@chakra-ui/react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import BottomNavbar from './components/bottom-navbar/BottomNavbar';
// import Card from './components/card/Card';
import Header from './components/header/Header';
import Index from './pages/index/Index';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import AddProfileAccount from './pages/profile/components/AddProfileAccount';
import AlertState from './context/AlertState';
import Alert from './components/global/Alert';

function App() {
	const [mobileScreen] = useMediaQuery('(max-width: 850px)');
	const location = useLocation();

	return (
		<>
			<AlertState>
				{location.pathname !== '/profile/addaccount' &&
					<>
						< Header />
						{mobileScreen && <BottomNavbar />}
						{/* <Card /> */}
					</>
				}
				<Routes>
					<Route path='/' element={<Index />} />
					<Route path='/login' element={<Login />} />
					<Route path='/profile' >
						<Route index element={<Profile />} />
						<Route path='addaccount' element={<AddProfileAccount />} />
					</Route>
				</Routes>

				<Alert />
			</AlertState>
		</>
	);
}

export default App;

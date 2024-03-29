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
import UserState from './context/UserContext';
import EditProfileHead from './pages/profile/components/EditProfileHead';
import Settings from './pages/settings/Settings';
import TermsAndConditions from './pages/others/TermsAndConditions';
import PrivacyPolicy from './pages/others/PrivacyPolicy';
import UserProfile from './pages/userprofile/UserProfile';
import Home from './pages/home/Home';
import SearchUser from './pages/search/SearchUser';
import Shop from './pages/shop/Shop';
import Info from './pages/info/Info';

function App() {
	const [mobileScreen] = useMediaQuery('(max-width: 850px)');
	const location = useLocation();

	window.addEventListener("beforeunload", () => {
		sessionStorage.removeItem('rendered')
	});

	return (
		<>
			<UserState>
				<AlertState>
					{location.pathname !== '/profile/addaccount' &&
						<>
							{location.pathname !== '/search' &&
								< Header />
							}
							{mobileScreen && <BottomNavbar />}
						</>
					}

					<Routes>
						<Route path='/' element={<Index />} />
						<Route path='/user/:username' element={<UserProfile />} />

						<Route path='/login' element={<Login />} />
						<Route path='/home' element={<Home />} />
						<Route path='/profile' >
							<Route index element={<Profile />} />
							<Route path='addaccount' element={<AddProfileAccount />} />
							<Route path='editprofile' element={<EditProfileHead />} />
						</Route>
						<Route path='/info' element={<Info />} />
						<Route path='/shop' element={<Shop />} />
						<Route path='/search' element={<SearchUser />} />
						<Route path='/settings' element={<Settings />} />

						<Route path='/termsandconditions' element={<TermsAndConditions />} />
						<Route path='/privacypolicy' element={<PrivacyPolicy />} />
					</Routes>
					<Alert />
				</AlertState>
			</UserState>
		</>
	);
}

export default App;

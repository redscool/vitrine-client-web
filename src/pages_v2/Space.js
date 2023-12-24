import React, { useEffect, useState } from 'react';
import styles from '../styles_v2/pages_v2/Dashboard.module.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from '../components_v2/Sidebar';
import Chat from '../components_v2/space/Chat';
import Calendar from '../components_v2/space/Calendar';
import Shelf from '../components_v2/space/Shelf';
import Folder from '../components_v2/space/shelf/Folder';
import Page from '../components_v2/space/Page';
export default function Dashboard() {
	const links = [
		{
			href: 'home',
			displayText: 'Home',
			disabled: false,
			notifs: [],
		},
		{
			href: 'shelf',
			displayText: 'Shelf',
			disabled: false,
			notifs: [],
		},
		{
			href: 'exercise',
			displayText: 'Exercise',
			disabled: false,
			notifs: [],
		},
		{
			href: 'page',
			displayText: 'Page',
			disabled: false,
			notifs: [],
		},
		{
			href: 'chat',
			displayText: 'Chat',
			disabled: false,
			notifs: [],
		},
		{
			href: 'calendar',
			displayText: 'Calendar',
			disabled: false,
			notifs: [],
		},
	];
	const location = useLocation();
	const [selected, setSelected] = useState('');
	useEffect(() => {
		setSelected(location.pathname.split('/')[2]);
	}, [location]);
	return (
		<div className={styles.page}>
			<Sidebar
				selected={selected}
				links={links}
			/>
			<Routes>
				<Route
					exact
					path="/home"
					element={<></>}
				/>
				<Route
					exact
					path="/"
					element={<></>}
				/>
				<Route
					exact
					path="/shelf"
					element={<Shelf />}
				/>
				<Route
					exact
					path="/shelf/:folderId"
					element={<Folder />}
				/>
				<Route
					exact
					path="/exercise"
					element={<></>}
				/>
				<Route
					exact
					path="/page"
					element={<Page />}
				/>
				<Route
					exact
					path="/chat"
					element={<Chat />}
				/>
				<Route
					exact
					path="/Calendar"
					element={<Calendar />}
				/>
				<Route
					exact
					path="/calendar/:year/:month"
					element={<Calendar />}
				/>
				<Route
					exact
					path="/calendar/:year/:month/:day"
					element={<Calendar />}
				/>
				<Route
					path="/*"
					element={<span> Not found </span>}
				/>
			</Routes>
		</div>
	);
}

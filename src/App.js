import {
	AppBar,
	Button,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	Toolbar,
	Typography,
	Divider,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import CalIcon from "@material-ui/icons/CalendarToday"
import AddIcon from "@material-ui/icons/Add";
import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import { auth } from "./firebase";
import Goal from "./goal";
import NewGoal from "./newgoal";
import { db } from "./firebase";

export function App(props) {
	const [drawer_open, setDrawerOpen] = useState(false);
	const [newGoal, setNewGoal] = useState(false);
	const [user, setUser] = useState(null);
	const [goals, setGoals] = useState([]);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(u => {
			if (u) {
				setUser(u);
			} else {
				props.history.push("/");
			}
		});

		return unsubscribe;
	}, [props.history]);

	useEffect(() => {
		let unsub;
		if (user) {
			unsub = db
				.collection("users")
				.doc(user.uid)
				.collection("goals")
				.onSnapshot(snapshot => {
					const goals = snapshot.docs.map(doc => {
						const goal = doc.data();
						goal.id = doc.id;
						return goal;
					});
					setGoals(goals);
				});
		}
		return unsub;
	}, [user]);

	const handleSignOut = () => {
		auth
			.signOut()
			.then(() => {
				props.history.push("/");
			})
			.catch(error => {
				alert(error.message);
			});
	};

	if (!user) {
		return <div />;
	}

	const handleNewGoal = () => {
		setNewGoal(true);
		setDrawerOpen(false);
	};

	return (
		<div>
			<AppBar position="static" color="primary">
				<Toolbar>
					<IconButton
						color="inherit"
						onClick={() => {
							setDrawerOpen(true);
						}}>
						<MenuIcon />
					</IconButton>
					<Typography
						variant="h6"
						color="inherit"
						style={{ flexGrow: 1, marginLeft: "30px" }}>
						SMART Goal Tracker
					</Typography>
					<Typography color="inherit" style={{ marginRight: "30px" }}>
						Hi! {user.email}
					</Typography>
					<Button color="inherit" onClick={handleSignOut}>
						Sign out
					</Button>
				</Toolbar>
			</AppBar>
			<Drawer
				open={drawer_open}
				onClose={() => {
					setDrawerOpen(false);
				}}>
				<List>
					{goals.map(goal => {
						return (
							<ListItem key={goal.id} onClick={() => {
                props.history.push("/app/goal/"+goal.id);
                setDrawerOpen(false)
              }} button>
								<ListItemIcon>
									<CalIcon/>
								</ListItemIcon>
								<ListItemText primary={goal.name} />
							</ListItem>
						);
					})}
					<Divider />

					<ListItem onClick={handleNewGoal} button>
						<ListItemIcon>
							<AddIcon />
						</ListItemIcon>
						<ListItemText primary="New Goal" />
					</ListItem>
				</List>
			</Drawer>
			<Route exact path="/app">
				<Dashboard goals={goals} user={user} />
			</Route>
			<Route path={"/app/goal/:goalId"}>
				<Goal user={user} />
			</Route>
			<NewGoal user={user} open={newGoal} onClose={() => setNewGoal(false)} />
		</div>
	);
}

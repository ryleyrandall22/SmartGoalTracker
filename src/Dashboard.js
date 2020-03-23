import { List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from "@material-ui/core";
import RightIocn from "@material-ui/icons/ChevronRight";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Dashboard(props) {
	const [goals, setGoals] = useState([
		{ name: "Weight Loss" },
		{ name: "Bench Press" },
    ]);
    
    let history = useHistory()

	return (
		<div style={{ display: "flex", justifyContent: "center", marginTop: 100 }}>
			<Paper style={{ padding: 10, width: "100%", maxWidth: 500 }}>
				<Typography variant="h4">Select a Goal</Typography>
				<List>
					{props.goals.map(goal => {
						return (
							<ListItem
								onClick={() => {
									history.push("/app/goal/" + goal.id);
								}}
								button>
								<ListItemText primary={goal.name} />
								<ListItemIcon>
									<RightIocn />
								</ListItemIcon>
							</ListItem>
						);
					})}
				</List>
			</Paper>
		</div>
	);
}

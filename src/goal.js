import {
	Paper,
	Typography,
	TextField,
	Button,
	Snackbar,
	SnackbarContent,
} from "@material-ui/core";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "./firebase";

export default function Goal(props) {
	const [goal, setGoal] = useState(null);
	const [checkpoints, setCheckpoints] = useState([]);
	const [number, setNumber] = useState("");
	const [comment, setComment] = useState("");
	const [addAlert, setAddAlert] = useState(false);

	let params = useParams();

	useEffect(() => {
		db.collection("users")
			.doc(props.user.uid)
			.collection("goals")
			.doc(params.goalId)
			.get()
			.then(doc => {
				const goal = doc.data();
				goal.id = doc.id;
				setGoal(goal);
			});
	}, [params, props.user.id]);

	useEffect(() => {
		let unsub;
		if (props.user && goal) {
			db.collection("users")
				.doc(props.user.uid)
				.collection("goals")
				.doc(goal.id)
				.collection("checkpoints")
				.onSnapshot(snapshot => {
					const checkpoints = snapshot.docs.map(doc => {
						const checkpoint = {
							value: parseInt(doc.data().value),
							comment: doc.data().comment,
							date: new Date(doc.data().date.seconds * 1000),
						};
						checkpoint.id = doc.id;
						return checkpoint;
					});
					console.log(checkpoints);
					setCheckpoints(checkpoints);
				});
		}
	}, [props.user, goal]);

	const handleSaveComment = () => {
		db.collection("users")
			.doc(props.user.uid)
			.collection("goals")
			.doc(goal.id)
			.collection("checkpoints")
			.add({
				value: number,
				comment: comment,
				date: new Date(),
			})
			.then(() => {
				setAddAlert(true);
				setNumber("");
				setComment("");
			})
			.catch(err => {
				console.log(err);
			});
	};
	if (!goal) {
		return <div />;
	}

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				marginTop: 30,
			}}>
			<div>
				<Typography variant="h3">{goal.name}</Typography>
			</div>

			<div
				style={{
					display: "flex",
					justifyContent: "space-around",
					marginTop: 40,
					width: "100%",
				}}>
				<Paper
					style={{
						padding: 30,
						flex: "1 0 22%",
						margin: 18,
						boxSizing: "border-box",
					}}>
					<Typography fontWeight="fontWeightBold" variant={"h6"}>
						Add Progress Checkmark
					</Typography>
					<TextField
						label="Value"
						placeholder="This should be a number"
						fullWidth
						value={number}
						style={{ marginTop: 20 }}
						onChange={e => setNumber(e.target.value)}
						variant="outlined"
					/>
					<TextField
						label="Comment"
						placeholder="This should be a number"
						fullWidth
						rows={4}
						multiline
						value={comment}
						style={{ marginTop: 20 }}
						onChange={e => setComment(e.target.value)}
						variant="outlined"
					/>
					<Button
						onClick={handleSaveComment}
						fullWidth
						variant="outlined"
						color={"primary"}
						style={{ marginTop: 20 }}>
						Submit
					</Button>
				</Paper>
				<Paper style={{ padding: 10, flex: "2 0 50%", margin: 18 }}>
					<Typography variant="h6">Your Progress</Typography>
				</Paper>
				<Paper style={{ padding: 10, flex: "1 0 22%", margin: 18 }}>
					HEllo
				</Paper>
				<Snackbar autoHideDuration={6000} open={addAlert} onClose={setAddAlert}>
					<SnackbarContent message="Checkpoint has been saved" />
				</Snackbar>
			</div>
		</div>
	);
}

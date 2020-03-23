import React, { useState, useEffect } from "react";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Button,
	TextField,
	IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import MomentUtils from "@date-io/moment";
import {db} from "./firebase"
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
export default function NewGoal(props) {
    const [open, setOpen] = useState(false)
	const [name, setName] = useState("");
	const [date, setDate] = useState(null);
	const [dateOpen, setDateOpen] = useState(false);
	const [number, setNumber] = useState("");
    const [label, setLabel] = useState("");
    

    useEffect(() => {
        setOpen(props.open)
    },[props.open])


    const createNewGoal = () => {

        db.collection('users').doc(props.user.uid).collection('goals').add({
            name:name,
            dueDate:date.toDate(),
            goal:number,
            label:label
        }).then(() => {
            props.onClose()
        })
        
        

    }

	return (
		<Dialog open={open} onClose={props.onClose}>
			<div style={{display:'flex', justifyContent:'space-between'}}>
				<DialogTitle>Create a New SMART Goal</DialogTitle>
				<IconButton onClick={props.onClose}>
					<CloseIcon />
				</IconButton>
			</div>
			<DialogContent>
				<DialogContentText>
					Reminder: SMART goals need to be be trackable and have be time
					sensative.
				</DialogContentText>
				<div>
					<TextField
						label="Name of Goal"
						placeholder="ex. Weight Loss"
						fullWidth
						value={name}
						onChange={e => setName(e.target.value)}
						variant="outlined"
					/>
					<MuiPickersUtilsProvider utils={MomentUtils}>
						<DatePicker
							disableToolbar
							style={{ marginTop: 20 }}
							open={dateOpen}
							variant="inline"
							label="End Date"
							helperText=""
							fullWidth
							onOpen={() => setDateOpen(true)}
							onClose={() => setDateOpen(false)}
							value={date}
							inputVariant="outlined"
							onChange={v => {
								setDate(v);
								setDateOpen(false);
							}}
						/>
					</MuiPickersUtilsProvider>
					<div style={{ display: "flex" }}>
						<TextField
							label="End Goal"
							style={{ marginTop: 20, marginRight: 10 }}
							placeholder="This should be a number"
							fullWidth
							type={"number"}
							value={number}
							onChange={e => setNumber(e.target.value)}
							variant="outlined"
						/>
						<TextField
							label="Label"
							style={{ marginTop: 20 }}
							placeholder="Lbs, miles, days, etc..."
							fullWidth
							value={label}
							onChange={e => setLabel(e.target.value)}
							variant="outlined"
						/>
					</div>
				</div>
			</DialogContent>
			<DialogActions>
				<Button onClick={createNewGoal} variant={"outlined"} color="primary">
					Create
				</Button>
			</DialogActions>
		</Dialog>
	);
}

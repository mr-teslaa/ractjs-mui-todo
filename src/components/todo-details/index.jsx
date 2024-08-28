import { Dialog, DialogActions, DialogTitle, Button } from "@mui/material";
import { Fragment } from "react";
import PropTypes from "prop-types";

const TodoDetails = ({
	todoDetails,
	openDialog,
	setOpenDialog,
	setTodoDetails,
}) => {
	return (
		<Fragment>
			<Dialog onClose={() => setOpenDialog(false)} open={openDialog}>
				<DialogTitle>{todoDetails?.todo}</DialogTitle>
				<DialogActions>
					<Button
						onClick={() => {
							setTodoDetails(null);
							setOpenDialog(false);
						}}
					>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	);
};

TodoDetails.propTypes = {
	todoDetails: PropTypes.object,
	openDialog: PropTypes.bool,
	setOpenDialog: PropTypes.bool,
	setTodoDetails: PropTypes.string,
};

export default TodoDetails;

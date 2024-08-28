import {
	Card,
	CardContent,
	Typography,
	CardActions,
	Button,
} from "@mui/material";
import PropTypes from "prop-types";

const TodoItem = ({ todoitem, fetchTodoDetails }) => {
	return (
		<div>
			<Card>
				<CardContent>
					<Typography variant="h5" color="text.secondary">
						{todoitem?.todo}
					</Typography>
				</CardContent>
				<CardActions>
					<Button
						sx={{
							backgroundColor: "#000",
							color: "#fff",
							opacity: "0.7", // Fixed the typo here
							"&:hover": {
								backgroundColor: "#ccc",
								color: "#222",
								opacity: "1",
							},
						}}
						onClick={() => fetchTodoDetails(todoitem?.id)}
					>
						Show Details
					</Button>
				</CardActions>
			</Card>
		</div>
	);
};

TodoItem.propTypes = {
	todoitem: PropTypes.shape({
		id: PropTypes.number.isRequired,
		todo: PropTypes.string.isRequired,
	}).isRequired,
	fetchTodoDetails: PropTypes.func,
};

export default TodoItem;

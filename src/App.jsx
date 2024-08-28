import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import TodoItem from "./components/todo-item";
import TodoDetails from "./components/todo-details";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const theme = createTheme({
	palette: {
		background: {
			default: "#f4f6f8", // Light grey background for a clean look
		},
		primary: {
			main: "#1976d2", // Blue primary color
		},
		secondary: {
			main: "#ff4081", // Pink secondary color for accents
		},
		text: {
			primary: "#333", // Dark grey text color
			secondary: "#757575", // Medium grey for secondary text
		},
	},
	typography: {
		fontFamily: "'Roboto', sans-serif",
		h6: {
			fontWeight: 600,
		},
	},
	shape: {
		borderRadius: 8, // Rounded corners for a modern look
	},
	shadows: Array(25).fill("none"), // Subtle shadow, less elevation for minimalistic feel
});

function App() {
	const [loading, setLoading] = useState(false);
	const [todoList, setTodoList] = useState([]);
	const [todoDetails, setTodoDetails] = useState(null);
	const [openDialog, setOpenDialog] = useState(false);
	const [errorMsg, setErrorMsg] = useState(false);

	// FETCH TODO LISTS
	const fetchTodos = async () => {
		try {
			setLoading(true);

			const apiResponse = await fetch("https://dummyjson.com/todos");
			const result = await apiResponse.json();

			console.log(result);

			if (result?.todos) {
				setTodoList(result.todos);
				setLoading(false);
				setErrorMsg("");
			} else {
				setTodoList([]);
				setLoading(false);
				setErrorMsg("No todos found.");
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
			setErrorMsg("Error fetching todos.");
		}
	};

	// FETCH A SINGLE TODO DETAILS
	const fetchTodoDetails = async (currentTodoId) => {
		try {
			const apiResponse = await fetch(
				`https://dummyjson.com/todos/${currentTodoId}`
			);

			const result = await apiResponse?.json();
			console.log(result);

			if (result) {
				setTodoDetails(result);
				setOpenDialog(true);
			} else {
				setTodoDetails(null);
				setOpenDialog(false);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchTodos();
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<Box sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
				<Typography variant="h4" color="primary" gutterBottom>
					Todo List
				</Typography>
				<Typography variant="subtitle1" color="text.secondary">
					Build with MUI 💙
				</Typography>

				{loading && (
					<Grid container spacing={2} sx={{ mt: 2 }}>
						{[...Array(6)].map((_, index) => (
							<Grid item xs={12} sm={6} md={4} key={index}>
								<Paper elevation={3} sx={{ p: 2 }}>
									<Skeleton
										variant="rectangular"
										height={140}
									/>
									<Box sx={{ pt: 0.5 }}>
										<Skeleton />
										<Skeleton width="60%" />
									</Box>
								</Paper>
							</Grid>
						))}
					</Grid>
				)}

				{errorMsg && (
					<Typography color="error" sx={{ mt: 2 }}>
						{errorMsg}
					</Typography>
				)}

				{!loading && (
					<Grid container spacing={2} sx={{ mt: 2 }}>
						{todoList.map((todo) => (
							<Grid item xs={12} sm={6} md={4} key={todo.id}>
								<Paper elevation={3} sx={{ p: 2 }}>
									<TodoItem
										todoitem={todo}
										fetchTodoDetails={fetchTodoDetails}
									/>
								</Paper>
							</Grid>
						))}
					</Grid>
				)}

				<TodoDetails
					openDialog={openDialog}
					todoDetails={todoDetails}
					setOpenDialog={setOpenDialog}
					setTodoDetails={setTodoDetails}
				/>

				<Typography variant="subtitle1" color="text.secondary">
					Project by
					<a
						href="https://HossainFoysal.com"
						className="ms-5"
						target="_new"
					>
						Hossain Foysal
					</a>
				</Typography>
			</Box>
		</ThemeProvider>
	);
}

export default App;

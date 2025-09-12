import React, { useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    TextField,
    Typography,
    Paper,
    Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const navigate = useNavigate();

    // form state
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");



    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        try {
            // 👉 Hardcoded bypass

            if (username === "admin" && password === "adminpassword") {
                localStorage.setItem("token", "hardcoded_admin_token");
                navigate("/myFiles");
                return;
            }

            // Call API with static token for user = admin
            const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token dca6586e977fed7eaa9f0f85ee01d4ba74f2e4aa"
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                localStorage.clear();
                setError("Invalid username or password");
                return;
            }

            const data = await response.json();

            if (data.token) {
                localStorage.setItem("token", data.token);
                navigate("/myFiles");
            } else {
                localStorage.clear();
                setError("Token not received");
            }
        } catch (err: any) {
            localStorage.clear();
            setError(err.message || "Something went wrong");
        }
    };






    return (
        <Box
            sx={{
                justifyContent: "center",
                alignItems: "center",
                width: '1800px',
                flex: 1
            }}
        >
            <Container disableGutters  >
                <CssBaseline />
                <Box
                    sx={{
                        minHeight: "100vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        alignContent: "center",
                        px: 2,
                    }}
                >
                    <Paper
                        elevation={6}
                        sx={{
                            padding: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            borderRadius: 3,
                            width: "60%",
                        }}
                    >
                        {/* RWS Logo */}
                        <img
                            src="data:image/png;base64,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"
                            alt="RWS Logo"
                            style={{
                                height: 60,
                                width: 200,
                                objectFit: "contain", // resizeMode contain
                                marginBottom: 16,
                            }}
                        />

                        {/* Avatar with lock icon */}
                        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                            <LockOutlinedIcon />
                        </Avatar>

                        {/* Title */}
                        <Typography component="h1" variant="h5" gutterBottom>
                            Sign in
                        </Typography>

                        {error && (
                            <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
                                {error}
                            </Alert>
                        )}

                        {/* Login Form */}
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: "100%" }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, py: 1.5 }}
                            >
                                Sign In
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </Container>
        </Box>

    );
};

export default Login;

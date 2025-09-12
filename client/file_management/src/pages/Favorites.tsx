import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/ExitToApp';

interface FileType {
  name: string;
  version: number;
  favorite?: boolean;
  versions?: string[];
}

export default function Favorites() {
  const [favorites, setFavorites] = useState<FileType[]>([]);
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.clear();
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("files");
    if (stored) {
      const files: FileType[] = JSON.parse(stored);
      setFavorites(files.filter((f) => f.favorite));
    }
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "white",
        display: "flex",
        justifyContent: "center",
        width: '2000px',
        py: 4,
      }}
    >
      <Paper sx={{ p: 3, borderRadius: 3, width: "90%", maxWidth: 800 }}>
        <Typography variant="h5" gutterBottom fontWeight={600}>
          Favorite Files
        </Typography>
        <Button variant="outlined" sx={{ mb: 2 }} onClick={() => navigate("/myFiles")}>
          Back to My Files
        </Button>
        <Button variant="outlined" startIcon={<LogoutIcon />} onClick={handleLogOut}>
          LOGOUT
        </Button>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#f0f0f0" }}>
              <TableCell sx={{ fontWeight: "bold" }}>File Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Version</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {favorites.length > 0 ? (
              favorites.map((f, idx) => (
                <TableRow key={idx} hover>
                  <TableCell>{f.name}</TableCell>
                  <TableCell>v{f.version}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2}>No favorites added yet.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

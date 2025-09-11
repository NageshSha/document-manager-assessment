import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import LogoutIcon from '@mui/icons-material/ExitToApp';
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

interface FileType {
  name: string;
  version: number;
  favorite?: boolean;
  versions?: string[];
}

export default function MyFiles() {
  const [files, setFiles] = useState<FileType[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null);
  const navigate = useNavigate();

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
      setFiles(JSON.parse(stored));
    } else {
      const initial = [
        { name: "DummyFile.pdf", version: 1, versions: ["v1"], favorite: false },
      ];
      setFiles(initial);
      localStorage.setItem("files", JSON.stringify(initial));
    }
  }, []);

 
  useEffect(() => {
    if (files.length > 0) {
      localStorage.setItem("files", JSON.stringify(files));
    }
  }, [files]);

  const handleUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        setFiles((prev) => [
          ...prev,
          { name: file.name, version: 1, versions: ["v1"], favorite: false },
        ]);
      }
    };
    input.click();
  };

 const handleDownload = (file: FileType) => {
  const latestVersion = file.versions?.[file.versions.length - 1] || `v${file.version}`;
  alert(`Downloading ${file.name} (${latestVersion})`);
};


  const handleUploadNew = (file: FileType) => {
    setFiles((prev) =>
      prev.map((f) =>
        f.name === file.name
          ? {
              ...f,
              version: f.version + 1,
              versions: [...(f.versions || []), `v${f.version + 1}`],
            }
          : f
      )
    );
  };

  const handleToggleFavorite = (file: FileType) => {
    setFiles((prev) =>
      prev.map((f) =>
        f.name === file.name ? { ...f, favorite: !f.favorite } : f
      )
    );
  };

  const handleViewVersions = (file: FileType) => {
    setSelectedFile(file);
    setOpenDialog(true);
  };

  const handleGoToFavorites = () => {
    navigate("/favorites");
  };
  
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };


  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "white", 
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        py: 4,
        width: '2000px'
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 3,
          borderRadius: 3,
          bgcolor: "white",
          width: "90%",
          maxWidth: 800,
        }}
      >
        <Typography variant="h5" gutterBottom fontWeight={600}>
          My Files
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <Button
            variant="contained"
            startIcon={<UploadIcon />}
            onClick={handleUpload}
          >
            Upload File
          </Button>
          <Button
            variant="outlined"
            startIcon={<StarIcon />}
            onClick={handleGoToFavorites}
          >
            View Favorites
          </Button>
          <Button
            variant="outlined"
            startIcon={<LogoutIcon />}
            onClick={handleLogOut}
          >
            LOGOUT
          </Button>
        </Box>

        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#f0f0f0" }}>
              <TableCell sx={{ fontWeight: "bold" }}>File Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Version</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((file, idx) => (
              <TableRow key={idx} hover>
                <TableCell>{file.name}</TableCell>
                <TableCell>v{file.version}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleViewVersions(file)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton
                    color="success"
                    onClick={() => handleDownload(file)}
                  >
                    <DownloadIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleUploadNew(file)}
                  >
                    <UploadIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleToggleFavorite(file)}
                    color={file.favorite ? "warning" : "default"}
                  >
                    {file.favorite ? <StarIcon /> : <StarBorderIcon />}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Versions dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>File Versions</DialogTitle>
        <DialogContent>
          <List>
            {selectedFile?.versions?.map((v, idx) => (
              <ListItem key={idx}>
                <ListItemText primary={`${selectedFile.name} - ${v}`} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

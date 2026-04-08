import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Grid,
  TextField,
  Input,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate } from "react-router-dom";
import {
  useAddProjectMutation,
  useDeleteProjectMutation,
  useGetProjectQuery,
  useUpdateProjectMutation,
} from "../redux/adminApi";
import { setLogout } from "../redux/adminSlice";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditOpen = () => setOpenEdit(true);
  const handleEditClose = () => setOpenEdit(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState({});
  const [selectedProject, setSelectedProject] = useState({});
  const admin = useSelector((state) => state.admin.admin);

  const {
    data: dataProject,
    isLoading: isLoadingProject,
    isFetching: isFetchProject,
    isSuccess: isSuccessProject,
    isError: isErrorProject,
    error: errorProject,
  } = useGetProjectQuery();
  const [
    addProject,
    {
      data: dataAddProject,
      isLoading: isLoadingAddProject,
      isFetching: isFetchAddProject,
      isSuccess: isSuccessAddProject,
      isError: isErrorAddProject,
      error: errorAddProject,
    },
  ] = useAddProjectMutation();
  const [
    updateProject,
    {
      data: dataUpdateProject,
      isLoading: isLoadingUpdateProject,
      isFetching: isFetchUpdateProject,
      isSuccess: isSuccessUpdateProject,
      isError: isErrorUpdateProject,
      error: errorUpdateProject,
    },
  ] = useUpdateProjectMutation();
  const [
    deleteProject,
    {
      data: dataDeleteProject,
      isLoading: isLoadingDeleteProject,
      isFetching: isFetchDeleteProject,
      isSuccess: isSuccessDeleteProject,
      isError: isErrorDeleteProject,
      error: errorDeleteProject,
    },
  ] = useDeleteProjectMutation();

  const handleChange = (e) => {
    const { value, name, type, files } = e.target;
    type === "file"
      ? setProjectData({
          ...projectData,
          [name]: files[0],
        })
      : setProjectData({ ...projectData, [name]: value });
  };
  const handleSubmit = (e) => {
    const fd = new FormData();
    fd.append("title", projectData.title);
    fd.append("desc", projectData.desc);
    fd.append("hostlink", projectData.hostlink);
    fd.append("gitlink", projectData.gitlink);
    fd.append("image", projectData.image);
    addProject(fd);
    handleClose();
  };

  const handleEditChange = (e) => {
    const { value, name, type, files } = e.target;
    type === "file"
      ? setSelectedProject({
          ...selectedProject,
          [name]: files[0],
          // preview: URL.createObjectURL(files[0])
        })
      : setSelectedProject({ ...selectedProject, [name]: value });
  };
  const handleUpdate = (e) => {
    if (selectedProject.newImage) {
      const fd = new FormData(); // multi-part
      fd.append("title", selectedProject.title);
      fd.append("desc", selectedProject.desc);
      fd.append("hostlink", selectedProject.hostlink);
      fd.append("gitlink", selectedProject.gitlink);
      fd.append("image", selectedProject.newImage);
      dispatch(updateProject({ _id: selectedProject._id, fd }));
    } else {
      dispatch(
        updateProject({ _id: selectedProject._id, fd: selectedProject })
      );
    }
  };

  const handleLogout = () => {
    dispatch(setLogout(null));
  };

  useEffect(() => {
    if (!admin) {
      navigate("/login");
    }
  }, [admin]);

  return (
    <>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        <Grid xs={10} xsOffset={3} height="83vh">
          <Button
            sx={{ marginTop: 3 }}
            onClick={handleOpen}
            size="small"
            variant="contained"
          >
            Add Projects
          </Button>
          <Link to="/message">
            <Button
              sx={{ marginTop: 3, marginLeft: 1, paddingX: "33px" }}
              size="small"
              variant="contained"
            >
              Message
            </Button>
          </Link>
          <Link to="/blogsList">
            <Button
              sx={{ marginTop: 3, marginLeft: 1, paddingX: "33px" }}
              size="small"
              variant="contained"
            >
              Blogs List
            </Button>
          </Link>
          <Button
            sx={{ marginTop: 3, marginLeft: 1, paddingX: "33px" }}
            onClick={handleLogout}
            size="small"
            variant="contained"
          >
            Logout
          </Button>
          <Modal
            open={open}
            sx={{ backgroundColor: "#90caf9" }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Grid
              container
              spacing={2}
              marginTop={15}
              sx={{ textAlign: "center", paddingX: 20 }}
            >
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  name="title"
                  type="text"
                  fullWidth
                  label="Title"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={handleChange}
                  name="hostlink"
                  type="text"
                  fullWidth
                  label="Host link"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={handleChange}
                  name="gitlink"
                  type="text"
                  fullWidth
                  label="Git link"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  name="desc"
                  type="text"
                  fullWidth
                  multiline
                  rows={3}
                  maxRows={4}
                  id="outlined-basic"
                  label="Desciption"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Input onChange={handleChange} name="image" type="file" />
              </Grid>
              <Grid item xs={12} xsOffset={6} sx={{}}>
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  sx={{ width: "25%", marginY: 2, marginX: 1 }}
                >
                  Add Projects
                </Button>
                <Button
                  onClick={handleClose}
                  variant="contained"
                  sx={{ width: "25%", marginY: 2, marginX: 1 }}
                >
                  Cancle
                </Button>
              </Grid>
            </Grid>
          </Modal>

          <TableContainer sx={{ height: 475, marginTop: "20px" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell align="right">Desc</TableCell>
                  <TableCell align="right">Git link</TableCell>
                  <TableCell align="right">Host link</TableCell>
                  <TableCell align="right">image</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataProject &&
                  dataProject.map((item) => (
                    <TableRow
                      key={item._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">{item.title}</TableCell>
                      <TableCell component="th" scope="row">
                        {item.desc}
                      </TableCell>
                      <TableCell align="right">{item.hostlink}</TableCell>
                      <TableCell align="right">{item.gitlink}</TableCell>
                      <TableCell align="right">
                        <img height={30} src={item.image} alt="" />
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          onClick={(e) => deleteProject(item._id)}
                          variant="contained"
                          color="error"
                          startIcon={<DeleteIcon />}
                        >
                          Delete
                        </Button>
                        <Button
                          onClick={(e) => {
                            handleEditOpen();
                            setSelectedProject(item);
                          }}
                          variant="contained"
                          color="warning"
                          startIcon={<EditIcon />}
                          sx={{ marginLeft: 1 }}
                        >
                          Edit
                        </Button>
                        {selectedProject && (
                          <Modal
                            open={openEdit}
                            sx={{ backgroundColor: "#90caf9" }}
                          >
                            <Grid
                              container
                              spacing={2}
                              marginTop={15}
                              sx={{ textAlign: "center", paddingX: 20 }}
                            >
                              <Grid item xs={12}>
                                <TextField
                                  onChange={handleEditChange}
                                  value={selectedProject.title}
                                  name="title"
                                  type="text"
                                  fullWidth
                                  label="Title"
                                  variant="outlined"
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  onChange={handleEditChange}
                                  value={selectedProject.hostlink}
                                  name="hostlink"
                                  type="text"
                                  fullWidth
                                  label="Host link"
                                  variant="outlined"
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  onChange={handleEditChange}
                                  value={selectedProject.gitlink}
                                  name="gitlink"
                                  type="text"
                                  fullWidth
                                  label="Git link"
                                  variant="outlined"
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  onChange={handleEditChange}
                                  value={selectedProject.desc}
                                  name="desc"
                                  type="text"
                                  fullWidth
                                  multiline
                                  rows={3}
                                  maxRows={4}
                                  id="outlined-basic"
                                  label="Desciption"
                                  variant="outlined"
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <Input
                                  onChange={handleEditChange}
                                  name="newImage"
                                  type="file"
                                />
                              </Grid>
                              <Grid item xs={12} xsOffset={6} sx={{}}>
                                <Button
                                  onClick={(e) => {
                                    handleUpdate();
                                    handleEditClose();
                                  }}
                                  variant="contained"
                                  sx={{ width: "25%", marginY: 2, marginX: 1 }}
                                >
                                  Edit Projects
                                </Button>
                                <Button
                                  onClick={handleEditClose}
                                  variant="contained"
                                  sx={{ width: "25%", marginY: 2, marginX: 1 }}
                                >
                                  Cancle
                                </Button>
                              </Grid>
                            </Grid>
                          </Modal>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;

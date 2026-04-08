import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/adminSlice";
import {
  useAddProjectMutation,
  useDeleteProjectMutation,
  useGetProjectQuery,
  useUpdateProjectMutation,
} from "../redux/adminApi";
import { Table, Button, Modal, Input, Form, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import CustomPagination from "../components/CustomPagination";

const PAGE_SIZE = 5;

const AdminDashboard = () => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [projectData, setProjectData] = useState({});
  const [selectedProject, setSelectedProject] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admin = useSelector((state) => state.admin.admin);

  const { data: dataProject } = useGetProjectQuery();
  const [page, setPage] = useState(1);
  const projectList = dataProject || [];
  const totalProjects = projectList.length;

  const paginatedProjects = useMemo(
    () =>
      projectList.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [projectList, page]
  );

  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil(totalProjects / PAGE_SIZE));
    if (page > maxPage) setPage(maxPage);
  }, [totalProjects, page]);
  const [addProject] = useAddProjectMutation();
  const [updateProject] = useUpdateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setProjectData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setProjectData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEditChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setSelectedProject((prev) => ({ ...prev, newImage: files[0] }));
    } else {
      setSelectedProject((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    const fd = new FormData();
    fd.append("title", projectData.title);
    fd.append("desc", projectData.desc);
    fd.append("hostlink", projectData.hostlink);
    fd.append("gitlink", projectData.gitlink);
    fd.append("image", projectData.image);
    addProject(fd)
      .then(() => {
        message.success("Project added successfully");
        setOpen(false);
        setProjectData({});
      })
      .catch(() => message.error("Failed to add project"));
  };

  const handleUpdate = () => {
    const fd = new FormData();
    fd.append("title", selectedProject.title);
    fd.append("desc", selectedProject.desc);
    fd.append("hostlink", selectedProject.hostlink);
    fd.append("gitlink", selectedProject.gitlink);
    if (selectedProject.newImage) fd.append("image", selectedProject.newImage);

    updateProject({ _id: selectedProject._id, fd })
      .then(() => {
        message.success("Project updated successfully");
        setOpenEdit(false);
      })
      .catch(() => message.error("Failed to update project"));
  };

  const handleLogout = () => dispatch(setLogout(null));

  const columns = [
    { title: "Title", dataIndex: "title", key: "title", ellipsis: true },
    { title: "Description", dataIndex: "desc", key: "desc", ellipsis: true },
    { title: "Git Link", dataIndex: "gitlink", key: "gitlink", ellipsis: true },
    { title: "Host Link", dataIndex: "hostlink", key: "hostlink", ellipsis: true },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) =>
        text ? (
          <img src={text} alt="" className="h-8 w-auto max-w-[80px] object-contain" />
        ) : (
          "—"
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex flex-wrap gap-2">
          <Button
            type="primary"
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => deleteProject(record._id)}
          >
            <span className="hidden xs:inline">Delete</span>
          </Button>
          <Button
            type="default"
            size="small"
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedProject(record);
              setOpenEdit(true);
            }}
          >
            <span className="hidden xs:inline">Edit</span>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 overflow-hidden">
      <h1
        className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6"
        style={{ color: "var(--color-text)" }}
      >
        Dashboard
      </h1>

      <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
        <Button
          type="primary"
          onClick={() => setOpen(true)}
          style={{
            backgroundColor: "var(--color-accent)",
            borderColor: "var(--color-accent)",
            color: "var(--color-on-accent)",
          }}
        >
          Add Project
        </Button>
        <Link to="/message">
          <Button type="default">Messages</Button>
        </Link>
        <Link to="/blogsList">
          <Button type="default">Blogs List</Button>
        </Link>
        <Button type="primary" danger onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <div className="overflow-x-auto -mx-2 sm:mx-0">
        <Table
          columns={columns}
          dataSource={paginatedProjects}
          rowKey={(record) => record._id}
          pagination={false}
          scroll={{ x: "max-content" }}
          size="middle"
        />
        <CustomPagination
          limit={PAGE_SIZE}
          current={page}
          total={totalProjects}
          onChange={(p) => setPage(p)}
        />
      </div>

      <Modal
        title="Add Project"
        open={open}
        onCancel={() => {
          setOpen(false);
          setProjectData({});
        }}
        footer={null}
        width="100%"
        style={{ maxWidth: 480 }}
      >
        <Form layout="vertical">
          <Form.Item label="Title">
            <Input name="title" value={projectData.title} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Host Link">
            <Input name="hostlink" value={projectData.hostlink} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Git Link">
            <Input name="gitlink" value={projectData.gitlink} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Description">
            <Input.TextArea
              name="desc"
              rows={4}
              value={projectData.desc}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Image">
            <input type="file" name="image" accept="image/*" onChange={handleChange} />
          </Form.Item>
          <div className="flex justify-end gap-2 flex-wrap">
            <Button
              type="primary"
              onClick={handleSubmit}
              style={{
                backgroundColor: "var(--color-accent)",
                borderColor: "var(--color-accent)",
                color: "var(--color-on-accent)",
              }}
            >
              Add
            </Button>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
          </div>
        </Form>
      </Modal>

      <Modal
        title="Edit Project"
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        footer={null}
        width="100%"
        style={{ maxWidth: 480 }}
      >
        <Form layout="vertical">
          <Form.Item label="Title">
            <Input
              name="title"
              value={selectedProject.title}
              onChange={handleEditChange}
            />
          </Form.Item>
          <Form.Item label="Host Link">
            <Input
              name="hostlink"
              value={selectedProject.hostlink}
              onChange={handleEditChange}
            />
          </Form.Item>
          <Form.Item label="Git Link">
            <Input
              name="gitlink"
              value={selectedProject.gitlink}
              onChange={handleEditChange}
            />
          </Form.Item>
          <Form.Item label="Description">
            <Input.TextArea
              name="desc"
              rows={4}
              value={selectedProject.desc}
              onChange={handleEditChange}
            />
          </Form.Item>
          <Form.Item label="Image">
            <input
              type="file"
              name="newImage"
              accept="image/*"
              onChange={handleEditChange}
            />
          </Form.Item>
          <div className="flex justify-end gap-2 flex-wrap">
            <Button
              type="primary"
              onClick={handleUpdate}
              style={{
                backgroundColor: "var(--color-accent)",
                borderColor: "var(--color-accent)",
                color: "var(--color-on-accent)",
              }}
            >
              Update
            </Button>
            <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminDashboard;

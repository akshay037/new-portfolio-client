import { Button, Modal, Row, Col, Input, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useState, useMemo, useEffect } from "react";
import { useAddBlogMutation, useGetAllBlogsQuery } from "../redux/adminApi";
import { Link } from "react-router-dom";
import CustomPagination from "../components/CustomPagination";

const { TextArea } = Input;

const BLOG_PAGE_SIZE = 5;

const BlogsList = () => {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [blogData, setBlogData] = useState({});
  const [selectedBlog, setSelectedBlog] = useState({});

  const [
    addBlog,
    {
      data: dataAddBlog,
      isLoading: isLoadingAddBlog,
      isFetching: isFetchAddBlog,
      isSuccess: isSuccessAddBlog,
      isError: isErrorAddBlog,
      error: errorAddBlog,
    },
  ] = useAddBlogMutation();

  const {
    data: dataBlog,
    isLoading: isLoadingBlog,
    isFetching: isFetchBlog,
    isSuccess: isSuccessBlog,
    isError: isErrorBlog,
    error: errorBlog,
  } = useGetAllBlogsQuery();

  const blogs = dataBlog || [];
  const totalBlogs = blogs.length;
  const paginatedBlogs = useMemo(
    () => blogs.slice((page - 1) * BLOG_PAGE_SIZE, page * BLOG_PAGE_SIZE),
    [blogs, page]
  );

  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil(totalBlogs / BLOG_PAGE_SIZE));
    if (page > maxPage) setPage(maxPage);
  }, [totalBlogs, page]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditClose = () => setOpenEdit(false);

  const handleChange = (e) => {
    const { value, name, type, files } = e.target;
    type === "file"
      ? setBlogData({ ...blogData, [name]: files[0] })
      : setBlogData({ ...blogData, [name]: value });
  };

  const handleEditChange = (e) => {
    const { value, name, type, files } = e.target;
    type === "file"
      ? setSelectedBlog({ ...selectedBlog, [name]: files[0] })
      : setSelectedBlog({ ...selectedBlog, [name]: value });
  };

  const handleSubmit = () => {
    const fd = new FormData();
    fd.append("title", blogData.title);
    fd.append("content", blogData.content);
    fd.append("hostlink", blogData.hostlink);
    fd.append("gitlink", blogData.gitlink);
    fd.append("image", blogData.image);

    addBlog(fd);
    handleClose();
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      responsive: ["xs", "sm", "md", "lg"],
    },
    { title: "Content", dataIndex: "content" },
    { title: "Host Link", dataIndex: "hostlink" },
    { title: "Git Link", dataIndex: "gitlink" },
    {
      title: "Image",
      dataIndex: "image",
      render: (img) => (
        <img src={img} alt="" className="h-10 w-auto rounded-md" />
      ),
    },
    {
      title: "Actions",
      render: (item) => (
        <div className="flex flex-wrap gap-2 justify-end">
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => deleteBlog(item._id)}
            className="w-full sm:w-auto"
          >
            Delete
          </Button>

          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedBlog(item);
              setOpenEdit(true);
            }}
            className="w-full sm:w-auto"
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full flex flex-col items-center p-4 min-h-screen">
      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <Button
          type="primary"
          onClick={handleOpen}
          className="w-full sm:w-auto"
        >
          Add Blogs
        </Button>

        <Link to="/dashboard" className="w-full sm:w-auto">
          <Button type="primary" className="w-full">
            Dashboard
          </Button>
        </Link>
      </div>

      {/* BLOGS TABLE */}
      <div className="w-full max-w-6xl mt-6">
        <div className="overflow-x-auto">
          <Table
            dataSource={paginatedBlogs}
            columns={columns}
            rowKey="_id"
            pagination={false}
            className="min-w-[600px]"
          />
          <CustomPagination
            limit={BLOG_PAGE_SIZE}
            current={page}
            total={totalBlogs}
            onChange={(p) => setPage(p)}
          />
        </div>
      </div>

      {/* ADD BLOG MODAL */}
      <Modal
        open={open}
        footer={null}
        onCancel={handleClose}
        className="max-w-lg mx-auto"
      >
        <div className="p-3">
          <Row gutter={[12, 12]}>
            <Col xs={24}>
              <Input
                name="title"
                placeholder="Blog Title"
                onChange={handleChange}
              />
            </Col>

            <Col xs={24} sm={12}>
              <Input
                name="hostlink"
                placeholder="Host Link"
                onChange={handleChange}
              />
            </Col>

            <Col xs={24} sm={12}>
              <Input
                name="gitlink"
                placeholder="Git Link"
                onChange={handleChange}
              />
            </Col>

            <Col xs={24}>
              <TextArea
                name="content"
                rows={3}
                onChange={handleChange}
                placeholder="Description"
              />
            </Col>

            <Col xs={24}>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="w-full"
              />
            </Col>

            <Col
              xs={24}
              className="flex flex-col sm:flex-row justify-center gap-3 mt-2"
            >
              <Button
                type="primary"
                className="w-full sm:w-auto"
                onClick={handleSubmit}
              >
                Add Blog
              </Button>

              <Button className="w-full sm:w-auto" onClick={handleClose}>
                Cancel
              </Button>
            </Col>
          </Row>
        </div>
      </Modal>

      {/* EDIT BLOG MODAL */}
      <Modal
        open={openEdit}
        footer={null}
        onCancel={handleEditClose}
        className="max-w-lg mx-auto"
      >
        <div className="p-3">
          <Row gutter={[12, 12]}>
            <Col xs={24}>
              <Input
                name="title"
                value={selectedBlog.title}
                onChange={handleEditChange}
              />
            </Col>

            <Col xs={24} sm={12}>
              <Input
                name="hostlink"
                value={selectedBlog.hostlink}
                onChange={handleEditChange}
              />
            </Col>

            <Col xs={24} sm={12}>
              <Input
                name="gitlink"
                value={selectedBlog.gitlink}
                onChange={handleEditChange}
              />
            </Col>

            <Col xs={24}>
              <TextArea
                name="desc"
                rows={3}
                value={selectedBlog.desc}
                onChange={handleEditChange}
              />
            </Col>

            <Col xs={24}>
              <input
                type="file"
                name="newImage"
                onChange={handleEditChange}
                className="w-full"
              />
            </Col>

            <Col
              xs={24}
              className="flex flex-col sm:flex-row justify-center gap-3 mt-2"
            >
              <Button
                type="primary"
                className="w-full sm:w-auto"
                onClick={() => {
                  handleUpdate();
                  handleEditClose();
                }}
              >
                Edit Blog
              </Button>

              <Button className="w-full sm:w-auto" onClick={handleEditClose}>
                Cancel
              </Button>
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  );
};

export default BlogsList;

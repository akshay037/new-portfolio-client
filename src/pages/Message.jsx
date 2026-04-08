import { useState, useMemo, useEffect } from "react";
import { Button, Table, Typography } from "antd";
import { Link } from "react-router-dom";
import { useGetContactUsQuery } from "../redux/adminApi";
import CustomPagination from "../components/CustomPagination";

const MESSAGE_PAGE_SIZE = 6;

const Message = () => {
  const [page, setPage] = useState(1);
  const {
    data: dataGetContactUs,
    isLoading: isLoadingGetContactUs,
    isFetching: isFetchGetContactUs,
    isSuccess: isSuccessGetContactUs,
    isError: isErrorGetContactUs,
    error: errorGetContactUs,
  } = useGetContactUsQuery();

  const messages = dataGetContactUs || [];
  const totalMessages = messages.length;
  const paginatedMessages = useMemo(
    () =>
      messages.slice(
        (page - 1) * MESSAGE_PAGE_SIZE,
        page * MESSAGE_PAGE_SIZE
      ),
    [messages, page]
  );

  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil(totalMessages / MESSAGE_PAGE_SIZE));
    if (page > maxPage) setPage(maxPage);
  }, [totalMessages, page]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      align: "left",
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "left",
    },
    {
      title: "Message",
      dataIndex: "message",
      align: "right",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      align: "right",
      render: (value) => {
        const date = new Date(value);
        return date.toLocaleDateString();
      },
    },
  ];

  return (
    <>
      <div className="flex flex-col items-center min-h-screen w-full">
        {/* Dashboard Button */}
        <div className="w-full flex justify-end mb-4">
          <Link to="/dashboard">
            <Button type="primary" className="px-6">
              Dashboard
            </Button>
          </Link>
        </div>

        {/* Heading */}
        <Typography.Title
          level={4}
          className="text-center mb-4"
          style={{ marginTop: "10px" }}
        >
          Messages
        </Typography.Title>

        {/* Table */}
        <div className="w-full max-w-5xl">
          <div className="overflow-x-auto">
            <Table
              dataSource={paginatedMessages}
              columns={columns}
              rowKey="_id"
              loading={isLoadingGetContactUs}
              pagination={false}
              className="min-w-[650px]"
            />
            <CustomPagination
              limit={MESSAGE_PAGE_SIZE}
              current={page}
              total={totalMessages}
              onChange={(p) => setPage(p)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;

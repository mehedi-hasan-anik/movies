import { Button, Input, Table } from "antd";
import type { SorterResult } from "antd/es/table/interface";
import { TableProps } from "antd/lib/table";
import { useEffect, useState } from "react";

const MovieTable = () => {
  const [showTable, setShowTable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userList, setUserList] = useState<any>({
    loading: true,
    pagination: {},
    data: [],
  });

  const [pagination, setPagination] = useState({});
  console.log(pagination);

  useEffect(() => {
    customFetch({});
  }, []);

  const columns = [
    {
      title: "id",
      dataIndex: "id",
    },
    {
      title: "title",
      dataIndex: "title",
      sorter: (a: any, b: any) => (a.title > b.title ? 1 : -1),
      render: (title: any) => `${title} ${title}`,
      width: "40%",
    },
    {
      title: "body",
      dataIndex: "body",
      sorter: (a: any, b: any) => (a.body > b.body ? 1 : -1),
      render: (body: any) => `${body} ${body}`,
      width: "40%",
    },
  ];
  const customFetch = async (params = {}) => {
    setIsLoading(true);
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_page=0&_limit=60"
    );
    const result = await response.json();
    setUserList({
      loading: true,
      pagination: {},
      data: result,
    });
    setIsLoading(false);
  };
  const handleTableChange: TableProps<any>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setPagination(pagination);

    customFetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortOrder: (sorter as SorterResult<any>).order,
      ...filters,
    });
  };

  const search = (value: any) => {
    const filterTable = userList.filter((o: any) =>
      Object.keys(o).some((k) =>
        String(o[k]).toLowerCase().includes(value.toLowerCase())
      )
    );

    setUserList(filterTable);
  };

  return (
    <div>
      <Button onClick={() => setShowTable((prevState) => !prevState)}>
        Load Now
      </Button>
      {showTable && (
        <div>
          <h1>Table</h1>
          <Input.Search
            placeholder="Search by..."
            enterButton
            onSearch={search}
          />
          <div>
            <Table
              columns={columns}
              dataSource={userList.data}
              loading={isLoading}
              onChange={handleTableChange}
              pagination={pagination}
              rowKey="email"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieTable;

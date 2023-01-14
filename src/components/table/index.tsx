import { Button, Input, Table } from "antd";
import { useEffect, useState } from "react";
import { getData } from "../api";
import "./style.css";

const columns = [
  {
    title: "title",
    dataIndex: "title",
    sorter: (a: any, b: any) => (a.title > b.title ? 1 : -1),
    render: (title: any) => `${title} ${title}`,
  },
  {
    title: "director",
    dataIndex: "director",
    sorter: (a: any, b: any) => (a.director > b.director ? 1 : -1),
    render: (director: any) => `${director} ${director}`,
  },
  {
    title: "objectId",
    dataIndex: "objectId",
    sorter: (a: any, b: any) => (a.objectId > b.objectId ? 1 : -1),
    render: (objectId: any) => `${objectId} ${objectId}`,
  },
];

const MovieTable = () => {
  const [showTable, setShowTable] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchRecords = (page: any) => {
    setLoading(true);
    getData(page).then((res) => {
      setDataSource(res.results);
      setTotalPages(res.count);
      setLoading(false);
    });
  };

  const search = (value: any) => {
    const filterTable = dataSource.filter((item: any) =>
      Object.keys(item).some((key) =>
        String(item[key]).toLowerCase().includes(value.toLowerCase())
      )
    );
    setDataSource(filterTable);
  };

  useEffect(() => {
    fetchRecords(1);
  }, []);

  return (
    <div style={{ marginTop: "50px" }}>
      {!showTable && (
        <Button onClick={() => setShowTable((prevState) => !prevState)}>
          Load Now
        </Button>
      )}

      {showTable && (
        <div>
          <div className="searchWrapper">
            <Input.Search
              placeholder="Search by..."
              enterButton
              onSearch={search}
              className="searchInput"
            />
          </div>

          <div className="tableWraper">
            <Table
              loading={loading}
              columns={columns}
              dataSource={dataSource}
              pagination={{
                pageSize: 2,
                total: totalPages,
                onChange: (page) => {
                  fetchRecords(page);
                },
              }}
            ></Table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieTable;

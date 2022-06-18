import React from "react";
import { Typography } from "antd";
const { Title } = Typography;

function Home() {
  return (
    <div
      className="site-layout-background"
      style={{
        marginTop: "30px",
        padding: 24,
        minHeight: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 1000,
          height: 400,
          backgroundColor: "#001529",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "20px",
        }}
      >
        <Title style={{ color: "#fff", fontSize: "80px" }} level={1}>
          Gerencie Sua Padaria
        </Title>
      </div>
    </div>
  );
}

export default Home;

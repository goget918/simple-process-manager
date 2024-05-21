import React from "react";

import DefaultLayout from "../DefaultLayout";
import HeaderContent from "../HeaderContent";

import { Layout } from "antd";

const { Content } = Layout;

export default function ControlLayout({
  children,
}) {
  return (
    <DefaultLayout>
      <Layout style={{ minHeight: "100vh" }}>
        <Layout className="site-layout">
          <HeaderContent />
          <Content
            className="site-layout-background"
            style={{
              padding: "50px 40px",
              margin: "50px auto",
              width: "100%",
              maxWidth: "1000px",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </DefaultLayout>
  );
}

import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import {
  RestOutlined,
  InboxOutlined,
  FileProtectOutlined,
  GiftOutlined,
} from "@ant-design/icons";

// Import Fake Data

function TopNavbar() {
  const items: MenuProps["items"] = [
    {
      label: (
        <a href="/" target="_blank" rel="noopener noreferrer">
          Trang chủ
        </a>
      ),
      key: "home",
      icon: "",
    },
    {
      label: "Thực phẩm đóng gói",
      key: "food",
      icon: <InboxOutlined style={{ fontSize: "1.8rem" }} />,
    },
    {
      label: "Đồ uống",
      key: "drink",
      icon: <RestOutlined style={{ fontSize: "1.8rem" }} />,
      children: [
        {
          type: "group",
          label: "Tăng lực",
          children: [
            {
              label: "Monster Energy",
              key: "setting:1",
            },
            {
              label: "Gmax Premium",
              key: "setting:2",
            },
          ],
        },
        {
          type: "group",
          label: "Dinh dưỡng",
          children: [
            {
              label: "Sắc đẹp",
              key: "setting:3",
            },
            {
              label: "Sức khoẻ",
              key: "setting:4",
            },
          ],
        },
      ],
    },
    {
      label: (
        <a href="/" target="_blank" rel="noopener noreferrer">
          Chương trình ưu đãi
        </a>
      ),
      key: "gift",
      icon: <GiftOutlined style={{ fontSize: "1.8rem" }} />,
      danger: true,
    },
    {
      label: (
        <a href="/" target="_blank" rel="noopener noreferrer">
          Blog
        </a>
      ),
      key: "blog",
      icon: <FileProtectOutlined style={{ fontSize: "1.8rem" }} />,
    },
  ];
  const [current, setCurrent] = useState("home");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <Menu
      selectable="true"
      className="header-nav__list"
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
}

export default TopNavbar;

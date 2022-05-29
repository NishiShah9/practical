import React from "react";
import { Card, Col, Tag } from "antd";

const textDisplay = (text) => {
  if (text?.length > 30) {
    return text.substring(0, 30) + "...";
  } else {
    return text || "";
  }
};

function SubCard({ item }) {
  return (
    <Col span={8} key={item.created_at_i}>
      <Card hoverable style={{ height: 200, padding: 10 }}>
        <h2>{textDisplay(item?.title)}</h2>
        <div>
          <b>ID:</b> {item?.objectID}
        </div>
        <div className="card-detail">
          <b>Author:</b> {item.author}
        </div>
        <div className="card-detail">
          {item?._tags.map((tag, index) => {
            return (
              <Tag color="lightgrey" key={index}>
                {tag}
              </Tag>
            );
          })}
        </div>
        <div>
          <a href={item?.url} target="_blank" rel="noreferrer">
            URL
          </a>
        </div>
      </Card>
    </Col>
  );
}

export default SubCard;

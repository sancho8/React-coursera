import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

function RenderDish({ dish }) {
  if (dish != null)
    return (
      <div className="col-12 col-md-5 m-1">
        <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  else return <div></div>;
}

function RenderComments({ comments }) {
  if (comments !== null) {
    const commentsList = comments.map((comment) => {
      return (
        <li>
          <div>{comment.comment}</div>
          <div>
            -- {comment.author}{" "}
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            }).format(new Date(Date.parse(comment.date)))}
          </div>
        </li>
      );
    });
    return (
      <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        <ul class="list-unstyled">{commentsList}</ul>
      </div>
    );
  } else return <div></div>;
}

const DishDetail = (props) => {
  if (props.dish)
    return (
      <div class="container">
        <div className="row">
          <RenderDish dish={props.dish}></RenderDish>
          <RenderComments comments={props.dish.comments}></RenderComments>
        </div>
      </div>
    );
  else return <div className="row"></div>;
};

export default DishDetail;

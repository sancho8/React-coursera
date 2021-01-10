import React, { Component } from "react";
import { Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";

class DishDetail extends Component {
  renderDish(dish) {
    if (dish != null)
      return (
        <Card>
          <CardImg top src={this.props.dish.image} alt={this.props.dish.name} />
          <CardBody>
            <CardTitle>{this.props.dish.name}</CardTitle>
            <CardText>{this.props.dish.description}</CardText>
          </CardBody>
        </Card>
      );
    else return <div></div>;
  }

  renderComments(comments) {
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
        <div>
          <h4>Comments</h4>
          <ul class="list-unstyled">{commentsList}</ul>
        </div>
      );
    } else return <div></div>;
  }

  render() {
    if (this.props.dish)
      return (
        <div class="container">
          <div className="row">
            <div className="col-12 col-md-5 m-1">
              {this.renderDish(this.props.dish)}
            </div>
            <div className="col-12 col-md-5 m-1">
              {this.renderComments(this.props.dish.comments)}
            </div>
          </div>
        </div>
      );
    else return <div className="row"></div>;
  }
}
export default DishDetail;

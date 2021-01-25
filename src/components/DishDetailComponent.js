/* eslint-disable react/jsx-pascal-case */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import { Loading } from "./LoadingComponent";
import { Control, Form, Errors, actions } from "react-redux-form";
import { baseUrl } from "../shared/baseUrl";

function RenderDish({ dish }) {
  if (dish != null)
    return (
      <Card>
        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  else return <div></div>;
}

function RenderComments({ comments, postComment, dishId }) {
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
        <CommentForm dishId={dishId} postComment={postComment} />
      </div>
    );
  } else return <div></div>;
}

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.toggleSubmitCommentModal = this.toggleSubmitCommentModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleSubmitCommentModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSubmit(values) {
    this.props.postComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.comment
    );
  }

  render() {
    return (
      <div>
        <Button outline onClick={this.toggleSubmitCommentModal}>
          <span className="fa fa-edit fa-lg"></span> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleSubmitCommentModal}>
            Submit Comment
          </ModalHeader>
          <ModalBody>
            <Form
              model="feedback"
              onSubmit={(values) => this.handleSubmit(values)}
            >
              <Row className="form-group">
                <Label htmlFor="rating" md={12}>
                  First Name
                </Label>
                <Col md={12}>
                  <Control.select
                    model=".rating"
                    id="rating"
                    name="rating"
                    placeholder="Select option"
                    className="form-control"
                    validators={{
                      required,
                    }}
                  >
                    <option value="1" selected>
                      1
                    </option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">5</option>
                    <option value="5">5</option>
                  </Control.select>
                  <Errors
                    className="text-danger"
                    model=".rating"
                    show="touched"
                    messages={{
                      required: "Required",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="author" md={12}>
                  Your Name
                </Label>
                <Col md={12}>
                  <Control.text
                    model=".author"
                    id="author"
                    name="author"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: "Required",
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="comment" md={12}>
                  Comment
                </Label>
                <Col md={12}>
                  <Control.textarea
                    model=".comment"
                    id="comment"
                    name="comment"
                    rows="6"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={{ size: 12 }}>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const DishDetail = (props) => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments
              comments={props.comments}
              postComment={props.postComment}
              dishId={props.dish.id}
            />
          </div>
        </div>
      </div>
    );
  } else return <div className="row"></div>;
};

export default DishDetail;

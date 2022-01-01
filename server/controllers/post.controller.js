const Post = require("../models/post.model.js");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const list = async (req, res) => {
  const posts = await Post.find().sort("-createdAt");
  res.status(StatusCodes.OK).json(posts);
};

const read = async (req, res) => {
  const {
    params: { id: postId },
  } = req;

  const post = await Post.findOne({
    _id: postId,
  })
  if (!post) {
    throw new NotFoundError(`No post with id ${postId}`);
  }
  res.status(StatusCodes.OK).json(post);
};

const create = async (req, res) => {
  console.log(req.profile);
  req.body.createdBy = req.profile._id;
  const post = await Post.create(req.body);
  res.status(StatusCodes.CREATED).json(post);
};

const update = async (req, res) => {
  const {
    body: { title, text },
    profile: { _id },
    params: { id: postId },
  } = req;

  if (title === "" || text === "") {
    throw new BadRequestError("Title or Text fields cannot be empty");
  }
  const post = await Post.findByIdAndUpdate(
    { _id: postId, createdBy: _id },
    req.body,
    { new: true, runValidators: true }
  );
  if (!post) {
    throw new NotFoundError(`No post with id ${postId}`);
  }
  res.status(StatusCodes.OK).json({ post });
};

const remove = async (req, res) => {
  const {
    profile: { _id },
    params: { id: postId },
  } = req;

  const post = await Post.findByIdAndRemove({
    _id: postId,
    createdBy: _id,
  });
  if (!post) {
    throw new NotFoundError(`No post with id ${postId}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  create,
  remove,
  read,
  update,
  list,
};

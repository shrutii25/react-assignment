import React, { useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import axios from "axios";
import "../styles/posts.css";
import Zoom from "./zoom";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [selectedValue, setSelectedValue] = useState("cats");
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomedImageUrl, setZoomedImageUrl] = useState("");
  let count = 0;
  let image, author, likes, comments, title;
  useEffect(() => {
    getPosts();
  }, [selectedValue]);

  const getPosts = async () => {
    try {
      const res = await axios.get(
        `https://www.reddit.com/r/${selectedValue}.json`
      );
      setPosts(res.data.data.children);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleClick = (event, index) => {
    // const s = image.currentTarget.children[0].src;
    let zoom;
    if (posts[index].data.preview) {
      let length = posts[index].data.preview.images[0].resolutions.length;
      zoom = posts[index].data.preview.images[0].resolutions[length - 1].url;
    } else {
      zoom = event.currentTarget.children[0].src;
    }
    setZoomedImageUrl(zoom.replace(/&amp;/g, "&"));
    setIsZoomed(true);
  };

  const hideZoomed = () => {
    setIsZoomed(false);
  };

  return (
    <div className="container-custom">
      <div className="select-text">Select whatever you want to view</div>
      <Form.Select
        name="posts"
        id="posts"
        className="select"
        onChange={(e) => handleChange(e)}
      >
        <option value="alternativeart">alternativeart</option>
        <option value="pics">pics</option>
        <option value="gifs">gifs</option>
        <option value="adviceanimals">adviceanimals</option>
        <option value="cats" selected>
          cats
        </option>
        <option value="images">images</option>
        <option value="photoshopbattles">photoshopbattles</option>
        <option value="hmmm">hmmm</option>
        <option value="all">all</option>
        <option value="aww">aww</option>
      </Form.Select>
      <div className="grid-container">
        {posts.map((post, idx) => {
          if (post.data.thumbnail && post.data.thumbnail.includes("jpg")) {
            image = post.data.thumbnail;
            title = post.data.title;
            author = post.data.author;
            likes = post.data.ups;
            comments = post.data.num_comments;

            return (
              <Card
                className="card"
                onClick={(e) => handleClick(e, idx)}
                key={title}
              >
                <Card.Img src={image} alt="Card image cap" />
                <Card.Body>
                  <Card.Title>{title}</Card.Title>
                  <Card.Text>
                    Author: {author} <br /> {likes} likes <br /> {comments}
                    comments
                  </Card.Text>
                </Card.Body>
              </Card>
            );
          } else count++;
        })}
        {isZoomed && <Zoom hideZoomed={hideZoomed} image={zoomedImageUrl} />}
      </div>
      {count === posts.length && (
        <p className="text">Currently no posts available ☹</p>
      )}
    </div>
  );
};

export default AllPosts;

import React from "react";
import { Link } from "react-router-dom";
import blogs from "./blogs.json"; // Import your metadata JSON file

const Blogpage = () => {
  return (
    <div className="blog-container">
      <ul className="blog-list">
        {blogs.map((blog) => (
          <li className="blog-item" key={blog.id}>
            <div className="blog-container1">
              <div className="img">
                <img src={blog.thumbnail} alt={blog.title} />
              </div>
              <div className="blog-details">
                <h1 className="blog-title">{blog.title}</h1>
                <h4 className="blog-date">Published date: {blog.Publish}</h4>
                <p className="blog-description">{blog.description}</p>
                <Link className="blog-link" to={`/Blogpage/${blog.title}`}>
                  Read More
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogpage;

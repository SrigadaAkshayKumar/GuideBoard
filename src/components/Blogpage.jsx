import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import blogs from "./blogs.json"; // Import your metadata JSON file

const Blogpage = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="blog-container">
      <ul className="blog-list">
        {blogs.map((blog) => (
          <li className="blog-item" key={blog.id}>
            <div className="blog-container1">
              <Link to={`/Blogpage/${blog.title}`}>
                <div className="img">
                  <img src={blog.thumbnail} alt={blog.title} />
                </div>
              </Link>
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
      {showScrollButton && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          ↑
        </button>
      )}
    </div>
  );
};

export default Blogpage;

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import blogs from "./blogs.json"; // Import your metadata JSON file

const Singleblog = () => {
  const { id } = useParams(); // `id` here is the blog title
  const [content, setContent] = useState("");
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        // Find the blog entry in blogs.json based on the title
        const blog = blogs.find((b) => b.title === id);

        if (blog) {
          // Dynamically import the Markdown file using the blog's id
          const blogContent = await import(`./blogs/blog${blog.id}.md`);
          const response = await fetch(blogContent.default);
          const text = await response.text();
          setContent(text);
        } else {
          setContent("Blog not found.");
        }
      } catch (error) {
        console.error("Error loading blog:", error);
        setContent("Blog not found.");
      }
    };

    fetchBlog();
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
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
    <div>
      <div className="singleblog-container">
        <div className="singleblog-actions">
          <button
            className="share-button"
            onClick={() => {
              if (navigator.share) {
                navigator
                  .share({
                    title: "Check out this blog!",
                    text: "I found this blog interesting, and I think you might like it too.",
                    url: window.location.href,
                  })
                  .then(() => console.log("Successfully shared"))
                  .catch((error) => console.error("Error sharing:", error));
              } else {
                alert("Sharing not supported on this browser.");
              }
            }}
          >
            Share
          </button>
        </div>
        <ReactMarkdown className="singleblog-content">{content}</ReactMarkdown>
      </div>
      <h1 className="also-read">Also Read</h1>
      <div className="suggested-blogs">
        <div className="suggested-blogs-list">
          {blogs.slice(0, 3).map((blog) => (
            <div key={blog.id} className="suggested-blog-item">
              <Link to={`/BlogPage/${blog.title}`}>
                <div className="img1">
                  <img src={blog.thumbnail} alt={blog.title} />
                </div>
              </Link>
              <div>
                <h2>{blog.title}</h2>
                <p>{blog.description}</p>
                <h3 className="publishh">published: {blog.Publish}</h3>
                <Link
                  className="suggested-blog-link"
                  to={`/BlogPage/${blog.title}`}
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Scroll to Top Button */}
      {showScrollButton && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          ↑
        </button>
      )}
    </div>
  );
};

export default Singleblog;

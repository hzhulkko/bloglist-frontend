import React from 'react';

const BlogForm = (props) => {

  const blog = props.blog

  return(

      <form onSubmit={props.handleAdd}>
        <div>
          title
            <input
            type="text"
            value={blog.title}
            name="title"
            onChange={props.handleTitleChange}
          />
        </div>
        <div>
          author
            <input
            type="text"
            value={blog.author}
            name="author"
            onChange={props.handleAuthorChange}
          />
        </div>
        <div>
          url
            <input
            type="text"
            value={blog.url}
            name="url"
            onChange={props.handleUrlChange}
          />
        </div>
        <button type="submit">add</button>
      </form>
  )

}

export default BlogForm
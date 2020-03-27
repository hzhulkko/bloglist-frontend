import React, {useState} from 'react';

const BlogForm = ({addblog}) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleAdd = (event) => {
    event.preventDefault()
    const newBlog = {title, author, url}
    addblog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(

      <form onSubmit={handleAdd}>
        <div>
          title
            <input
            type="text"
            value={title}
            name="title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author
            <input
            type="text"
            value={author}
            name="author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url
            <input
            type="text"
            value={url}
            name="url"
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">add</button>
      </form>
  )

}

export default BlogForm
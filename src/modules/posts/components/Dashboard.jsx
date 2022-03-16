import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { DateTime } from 'luxon'
import '../styles/posts.css'
import { Card } from './Card'
import { DEFAULT_IMAGE, IMAGES } from '../utils/images'
import { PostContext } from '../../../context/PostContext'

export const Dashboard = () => {
  let urlImage = DEFAULT_IMAGE;
  const imagesList = IMAGES;

  const { currentPost, setCurrentPost } = useContext(PostContext)

  const now = DateTime.now()
  const date = now.toLocaleString(DateTime.DATE_FULL)
  const timestamp = now.toMillis();
  const [id, setId] = useState(null)
  const [image, setImage] = useState()
  const [tag, setTag] = useState()
  const [text, setText] = useState()
  const [title, setTitle] = useState()
  const [showMessage, setshowMessage] = useState(false)
  const [message, setMessage] = useState(null)

  const handleSetFields = () => {
    setImage(urlImage)
    setTag('Ingresa una etiqueta')
    setText('Ingresa un texto')
    setTitle('Ingresa un titulo')
    setCurrentPost({})
  }

  const handleFillFields = () => {
    setId(currentPost?._id)
    setImage(currentPost.image)
    setTag(currentPost.tag)
    setText(currentPost.text)
    setTitle(currentPost.title)
  }

  const handleImages = (image) => {
    setImage(image.url)
  }

  const handleTags = (event) => {
    setTag(event.target.value)
  }

  const handleTitle = (event) => {
    setTitle(event.target.value)
  }

  const handleText = (event) => {
    setText(event.target.value)
  }

  const handleSavePost = () => {
    const post = { id: timestamp, image, tag, text, title }
    axios.post('http://localhost:8000/post/add', post).then(response => {
      setMessage('Post creado exitosamente')
      setshowMessage(true)
      handleSetFields()
    }).catch(error => {
      handleSetFields()
    })
  }

  const handleUpdatePost = () => {
    const post = { image, tag, text, title }
    axios.put(`http://localhost:8000/post/edit/${id}`, post).then(response => {
      setMessage('Post actualizado satisfatoriamente')
      setshowMessage(true)
      handleSetFields()
    }).catch(error => {
      handleSetFields()
    })
  }

  const handleDeletePost = () => {
    axios.delete(`http://localhost:8000/post/delete/${id}`).then(response => {
      setMessage('Post eliminado satisfatoriamente')  
      setshowMessage(true)
      handleSetFields()
    }).catch(error => {
      handleSetFields()
    })
  }

  useEffect(() => {
    if (currentPost?._id) {
      handleFillFields()
    } else {
      handleSetFields()
    }
  }, [])
  

  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col-lg-5 mb-5">
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  Selecciona una imagen
                </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  {
                    imagesList.map((image, index) => (
                      <img
                        key={index}
                        width="100"
                        src={image.url}
                        className="images"
                        onClick={() => handleImages(image)}
                      />
                    ))
                  }
                </div>
              </div>
            </div>
            <div className="accordion-item mt-3" style={{ borderTop: 'solid 1px #dfdfdf' }}>
              <h2 className="accordion-header" id="headingTwo">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  Etiquetas
                </button>
              </h2>
              <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <div>
                    <label className="form-label">Agrega una etiqueta</label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={handleTags}
                    >
                      {
                        imagesList.map((image, index) => (
                          <option
                            key={index}
                            value={image.name}
                          >
                            { image.name }
                          </option>
                        ))
                      }
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="accordion-item mt-3" style={{ borderTop: 'solid 1px #dfdfdf' }}>
              <h2 className="accordion-header" id="headingFour">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                  Titulo
                </button>
              </h2>
              <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <label className="form-label">Agregar un titulo</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={handleTitle}
                  />
                </div>
              </div>
            </div>
            <div className="accordion-item mt-3" style={{ borderTop: 'solid 1px #dfdfdf' }}>
              <h2 className="accordion-header" id="headingThree">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  Texto
                </button>
              </h2>
              <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <label className="form-label">Agrega un texto</label>
                  <textarea
                    className="form-control"
                    id="text"
                    rows="3"
                    value={text}
                    onChange={handleText}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-1"></div>
        <div className="col-lg-6">
          <Card image={image} tag={tag} title={title} text={text} date={date}/>

          {/* Mensaje proceso exitoso */}
          {
            showMessage
              ? <div className="alert alert-success alert-dismissible fade show mt-3" role="alert">
                  { message }
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                    onClick={() => setshowMessage(false)}
                  ></button>
                </div>
              : null
          }

          {/* Botones */}
          <div className="d-flex justify-content-around mt-4">
            <button
              type="button"
              className="btn btn-outline-info"
              onClick={() => handleSetFields()}
            >
              Limpiar campos
            </button>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => handleDeletePost()}
            >
              Eliminar
            </button>
            <button
              type="button"
              className="btn btn-outline-warning"
              onClick={() => handleUpdatePost()}
            >
              Actualizar
            </button>
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={() => handleSavePost()}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

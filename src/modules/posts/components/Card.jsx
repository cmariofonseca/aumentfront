import React from 'react'

export const Card = ({image, tag, title, text, date}) => {
  return (
    <div className="card">
      <img src={image} className="card-img-top" alt="..." />
      <div className="card-body">
        <div className="d-flex">
          <span className="badge bg-info text-dark d-flex align-items-center">{tag}</span>
          <h4 className="card-title ms-5">{title}</h4>
        </div>
        <p className="card-text mt-3">{text}</p>
        <p className="card-text"><small className="text-muted">{date}</small></p>
      </div>
    </div>
  )
}

import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const truncateText = (text, maxWords) => {
  if (!text) return '';
  const words = text.split(' ');
  return words.length > maxWords 
    ? words.slice(0, maxWords).join(' ') + '...' 
    : text;
};

function NewsCard(props) {
  const {
    headline,
    abstract,
    source,
    author,
    imageUrl, 
    fullArticleUrl,
    onSave,
    onUnsave,
    isSaved = false,
  } = props;

  const [showModal, setShowModal] = useState(false);
  const [savedStatus, setSavedStatus] = useState(isSaved);

  const handleSaveClick = () => {
    setShowModal(true);
  };

  const confirmSave = () => {
    if (savedStatus) {
      onUnsave && onUnsave();
      setSavedStatus(false);
    } else {
      onSave && onSave();
      setSavedStatus(true);
    }
    setShowModal(false);
  };

  return (
    <div 
      className="h-100 d-flex flex-column" 
      style={{ 
        border: 'none',
        boxShadow: 'none'
      }}
    >
      
      {/* Image */}
      <img
        src={imageUrl || "default-image.jpg"}
        className="w-100"
        alt={headline}
        style={{ 
          objectFit: "cover", 
          height: "200px",
          borderRadius: '8px',
          marginBottom: '15px'
        }}
      />

      {/* Card Body dengan flex grow */}
      <div className="flex-grow-1 d-flex flex-column">
        <h5 
          className="mb-2" 
          style={{ 
            fontWeight: 600, 
            height: '3rem', 
            overflow: 'hidden'
          }}
        >
          {truncateText(headline, 8)}
        </h5>
        
        <h6 className="text-muted mb-2">{source}</h6>
        
        <p 
          className="text-muted flex-grow-1" 
          style={{ 
            height: '4.5rem', 
            overflow: 'hidden'
          }}
        >
          {truncateText(abstract, 15)}
        </p>
        
        <small className="text-muted d-block mb-2">
          {truncateText(author, 3)}
        </small>
        
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <a 
            href={fullArticleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-link text-primary p-0"
            style={{ textDecoration: 'none' }}
          >
            Read More
          </a>
          <button
            className={`btn btn-sm ${savedStatus ? "btn-danger" : "btn-primary"}`}
            onClick={handleSaveClick}
          >
            {savedStatus ? "Unsave" : "Save"}
          </button>
        </div>
      </div>

      {/* Modal Confirmation */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {savedStatus ? "Unsave News?" : "Save News?"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to {savedStatus ? "unsave" : "save"} this news
          article?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant={savedStatus ? "danger" : "primary"}
            onClick={confirmSave}
          >
            {savedStatus ? "Unsave" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export { NewsCard };
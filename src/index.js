import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'
import Row from './row'
import Col from './column'
import ImgWrapper from './img-wrapper'

const prevIndex = state => (state.index - 1) % state.images.length
const nextIndex = state =>
  (state.index + state.images.length + 1) % state.images.length

class Gallery extends Component {
  constructor(props) {
    super(props)

    this.state = {
      index: 0,
      isOpen: false,
      images: props.images,
      thumbs: props.thumbs,
    }

    this.renderLightBox = this.renderLightBox.bind(this)
    this.openLightBox = this.openLightBox.bind(this)
    this.closeLightbox = this.closeLightbox.bind(this)
    this.movePrev = this.movePrev.bind(this)
    this.moveNext = this.moveNext.bind(this)
  }

  openLightBox(index) {
    this.setState({
      index: index,
      isOpen: true,
    })
  }

  renderLightBox() {
    const { images, thumbs } = this.state
    return (
      <Lightbox
        mainSrc={images[this.state.index]}
        nextSrc={images[nextIndex(this.state)]}
        prevSrc={images[prevIndex(this.state)]}
        mainSrcThumbnail={thumbs[this.state.index]}
        nextSrcThumbnail={thumbs[nextIndex(this.state)]}
        prevSrcThumbnail={thumbs[prevIndex(this.state)]}
        onCloseRequest={this.closeLightbox}
        onMovePrevRequest={this.movePrev}
        onMoveNextRequest={this.moveNext}
        imageLoadErrorMessage="Could not load this image"
        nextLabel="Next image"
        prevLabel="Previous image"
        zoomInLabel="Zoom in"
        zoomOutLabel="Zoom out"
        closeLabel="Close"
      />
    )
  }

  closeLightbox() {
    this.setState({ isOpen: false })
  }

  movePrev() {
    this.setState(prevState => ({
      index: prevIndex(prevState),
    }))
  }

  moveNext() {
    this.setState(prevState => ({
      index: nextIndex(prevState),
    }))
  }

  render() {
    const {
      colWidth = 100 / 3,
      mdColWidth = 100 / 4,
      gutter = '0.25rem',
      imgClass = '',
    } = this.props
    return (
      <React.Fragment>
        <Row>
          {this.state.thumbs.map((thumbnail, index) => {
            return (
              <Col
                width={colWidth}
                md={mdColWidth}
                key={index}
                onClick={() => this.openLightBox(index)}
              >
                <ImgWrapper margin={gutter}>
                  <Img fluid={thumbnail} className={imgClass} />
                </ImgWrapper>
              </Col>
            )
          })}
        </Row>
        {this.state.isOpen && this.renderLightBox()}
      </React.Fragment>
    )
  }
}

export default Gallery

Gallery.propTypes = {
  images: PropTypes.array.isRequired,
  thumbs: PropTypes.array.isRequired,
  colWidth: PropTypes.number,
  mdColWidth: PropTypes.number,
  gutter: PropTypes.string,
  imgClass: PropTypes.string,
}



const Menu = ({ setPage }) => {

    const padding = {
      paddingRight: 5
    }

    return (
      <div>
        <a href='#' style={padding} onClick={() => setPage('anecdotes')}>anecdotes</a>
        <a href='#' style={padding} onClick={() => setPage('new')}>create new</a>
        <a href='#' style={padding} onClick={() => setPage('about')}>about</a>
      </div>
    )
  }

export default Menu
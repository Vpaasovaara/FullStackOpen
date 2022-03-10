
// 6.12* paremmat anekdootit, step10
const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'FILTER':
            return action.content
        default:
            return state
    }
}

export const filter = (content) => {
    return { type: 'FILTER', 
        content: content
  }
}

export default filterReducer
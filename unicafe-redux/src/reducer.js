const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)

  let temp = {...state}
  switch (action.type) {
    case 'GOOD':
      temp.good += 1
      return temp
    case 'OK':
      temp.ok += 1
      return temp
    case 'BAD':
      temp.bad += 1
      return temp
    case 'ZERO':
      return {good: 0,ok: 0,bad: 0}
    default: return state
  }
  
}

export default counterReducer
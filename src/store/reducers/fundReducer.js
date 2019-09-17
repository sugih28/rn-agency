const initState = {
    fundPerformance: [],
    loading: false
}

const fundReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOAD_FUND_PERFORMANCE_PROCESS':
            return {
                ...state,
                loading: true
            }         
        case 'LOAD_FUND_PERFORMANCE':
            return {
                ...state,
                fundPerformance: action.fundPerformance,
                loading: false
            }         
        case 'LOAD_FUND_PERFORMANCE_ERR':
            alert(action.err)
            return {
                ...state,
                loading: false
            }         
        default:
            return state
    }
}

export default fundReducer
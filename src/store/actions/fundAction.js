import axios from 'axios'

const url = 'http://langitsalam.com:13786/api/v1'


export function loadFundPerformance(token) {
    return(dispatch) => {
        const config = {
            headers: {
                'Authorization': 'bearer '+token
            }
        }

        dispatch({
            type: 'LOAD_FUND_PERFORMANCE_PROCESS',
        })

        axios.get(url+'/getFundPerformance',config)
            .then(res => {
                dispatch({
                    type: 'LOAD_FUND_PERFORMANCE',
                    fundPerformance: res.data
                })
            }).catch(err => {
                dispatch({
                    type: 'LOAD_FUND_PERFORMANCE_ERR',
                    err
                })
            })
    }
}
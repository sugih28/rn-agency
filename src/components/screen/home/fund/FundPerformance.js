import React, { Component } from 'react'
import { View, Alert, RefreshControl } from 'react-native'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withTheme, Text, DataTable, ActivityIndicator, Portal, Modal, Button, IconButton, Title} from 'react-native-paper'
import Header from '../../../layout/Header'
import {loadFundPerformance} from '../../../../store/actions/fundAction'
import { ScrollView } from 'react-native-gesture-handler'
import {LineChart} from 'react-native-chart-kit'
import Table from 'react-native-simple-table'
import LottieView from 'lottie-react-native'

export class FundPerformance extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
            modalVisible: false,
            dataPoint: {},
            refreshing: false
        }
    }

    componentDidMount() {
        this.props.loadFundPerformance(this.props.user.token) 
        setTimeout(() => this.setState({
            loaded: true
        }), 500)           
    }

    refreshHandle = () => {
        this.props.loadFundPerformance(this.props.user.token)
    }

    getBulan = (noBulan) => {
        let allBulan = []
        allBulan[1] = 'Jan'
        allBulan[2] = 'Feb'
        allBulan[3] = 'Mar'
        allBulan[4] = 'Apr'
        allBulan[5] = 'Mei'
        allBulan[6] = 'Jun'
        allBulan[7] = 'Jul'
        allBulan[8] = 'Agu'
        allBulan[9] = 'Sep'
        allBulan[10] = 'Okt'
        allBulan[11] = 'Nov'
        allBulan[12] = 'Des'

        return allBulan[Number(noBulan)]
    }

    render() {
        const {theme, navigation, user, fundPerformance} = this.props

        const columnTable = [
            {
                title: 'Nama',
                dataIndex: 'name',
                width: 200,
            },{
                title: 'Tanggal',
                dataIndex: 'tanggal_nab'
            },{
                title: 'Nilai',
                dataIndex: 'nab'
            },{
                title: 'Nilai Awal',
                dataIndex: 'return_awal'
            },{
                title: 'Nilai 1 Bulan',
                dataIndex: 'return_1bln'
            },{
                title: 'Nilai 3 Bulan',
                dataIndex: 'return_3bln'
            },{
                title: 'Nilai 12 Bulan',
                dataIndex: 'return_12bln'
            },{
                title: 'Nilai 36 Bulan',
                dataIndex: 'return_36bln'
            },{
                title: 'Nilai 60 Bulan',
                dataIndex: 'return_60bln'
            },
        ]

        const displayContent = (this.props.fundPerformance.length && this.state.loaded) ? (
            <ScrollView refreshControl={
                <RefreshControl refreshing={this.props.fundPerformanceLoading} onRefresh={() => this.refreshHandle()} />
            }>
                <ScrollView horizontal={true} bounces={false} style={{backgroundColor: theme.colors.primary}}>
                    <LineChart
                        data={{
                            labels: [
                                '01,Feb,19', '02,Feb,19', '03,Feb,19', '04,Feb,19', "05,Feb,19",
                                '06,Feb,19', '07,Feb,19', '08,Feb,19', '09,Feb,19', "10,Feb,19",
                                '11,Feb,19', '12,Feb,19', '13,Feb,19', '14,Feb,19', "15,Feb,19",
                                '16,Feb,19', '17,Feb,19', '18,Feb,19', '19,Feb,19', "20,Feb,19",
                                '21,Feb,19', '22,Feb,19', '23,Feb,19', '24,Feb,19', "25,Feb,19",
                                '26,Feb,19', '27,Feb,19', '28,Feb,19', '29,Feb,19', "30,Feb,19",
                            ],
                            datasets: [{
                                data: [
                                    Math.random(), Math.random(), Math.random(), Math.random(), Math.random(),
                                    Math.random(), Math.random(), Math.random(), Math.random(), Math.random(),
                                    Math.random(), Math.random(), Math.random(), Math.random(), Math.random(),
                                    Math.random(), Math.random(), Math.random(), Math.random(), Math.random(),
                                    Math.random(), Math.random(), Math.random(), Math.random(), Math.random(),
                                    Math.random(), Math.random(), Math.random(), Math.random(), Math.random(),
                                ],
                                color: (opacity = 1) => '#ffeb3baa'
                            },{
                                data: [
                                    Math.random(), Math.random(), Math.random(), Math.random(), Math.random(),
                                    Math.random(), Math.random(), Math.random(), Math.random(), Math.random(),
                                    Math.random(), Math.random(), Math.random(), Math.random(), Math.random(),
                                    Math.random(), Math.random(), Math.random(), Math.random(), Math.random(),
                                    Math.random(), Math.random(), Math.random(), Math.random(), Math.random(),
                                    Math.random(), Math.random(), Math.random(), Math.random(), Math.random(),
                                ],
                                color: (opacity = 1) => '#333333aa'
                            },{
                                data: [
                                    Math.random(), Math.random(), Math.random(), Math.random(), Math.random(),
                                    Math.random(), Math.random(), Math.random(), Math.random(), Math.random(),
                                    Math.random(), Math.random(), Math.random(), Math.random(), Math.random(),
                                    Math.random(), Math.random(), Math.random(), Math.random(), Math.random(),
                                    Math.random(), Math.random(), Math.random(), Math.random(), Math.random(),
                                    Math.random(), Math.random(), Math.random(), Math.random(), Math.random(),
                                ],
                                color: (opacity = 1) => '#00e2ffaa'
                            },{
                                data: [
                                    Math.random(), Math.random(), Math.random(), Math.random(), Math.random(),
                                    Math.random(), Math.random(), Math.random(), Math.random(), Math.random(),
                                    Math.random(), Math.random(), Math.random(), Math.random(), Math.random(),
                                    Math.random(), Math.random(), Math.random(), Math.random(), Math.random(),
                                    Math.random(), Math.random(), Math.random(), Math.random(), Math.random(),
                                    Math.random(), Math.random(), Math.random(), Math.random(), Math.random(),
                                ],
                                color: (opacity = 1) => '#f5f5f5aa'
                            }]
                        }}
                        width={1500} // from react-native
                        height={220}
                        yAxisLabel={'$'}
                        chartConfig={{
                            backgroundGradientFrom: theme.colors.primary,
                            backgroundGradientTo: theme.colors.primary,
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            }
                        }}
                        bazier={true}
                        onDataPointClick={({getColor, value}) => Alert.alert('Value', value.toString(), [{text: 'Ok'}])}
                    />
                </ScrollView>

                <Table columnWidth={100} columns={columnTable} dataSource={this.props.fundPerformance} headerContainerStyle={{backgroundColor: theme.colors.surface, borderRightColor: theme.colors.backgroundColor,}} bodyContainerStyle={{backgroundColor: theme.colors.backgroundColor, borderRightColor: theme.colors.backgroundColor}} rowStyle={{borderBottomColor: theme.colors.surface,}} />                    
            </ScrollView>
        ) : (
            <View style={{height: 220, backgroundColor: theme.colors.primary}}>
                <LottieView source={require('../../../../assets/animation/dots-spinner')} autoPlay loop />
            </View>
        )

        return (
            <View style={{backgroundColor: theme.colors.backgroundColor, flex: 6, flexDirection: 'column'}}>
                <Header title="Fund Performance" navigation={navigation} backButton={true} />

                {displayContent}
            </View>
        )
    }
}

const getBulan = (noBulan) => {
    let allBulan = []
    allBulan[1] = 'Jan'
    allBulan[2] = 'Feb'
    allBulan[3] = 'Mar'
    allBulan[4] = 'Apr'
    allBulan[5] = 'Mei'
    allBulan[6] = 'Jun'
    allBulan[7] = 'Jul'
    allBulan[8] = 'Agu'
    allBulan[9] = 'Sep'
    allBulan[10] = 'Okt'
    allBulan[11] = 'Nov'
    allBulan[12] = 'Des'

    return allBulan[Number(noBulan)]
}

const mapStateToProps = (state) => {
    let fundPerformance = state.fund.fundPerformance

    for (const fp in fundPerformance) {
        const tanggal = fundPerformance[fp].nabdate.substring(8, 10)+' '+getBulan(fundPerformance[fp].nabdate.substring(5, 7))+' '+fundPerformance[fp].nabdate.substring(0, 4)
        fundPerformance[fp].tanggal_nab = tanggal
    }

    return {
        user: state.auth.user,
        fundPerformance: fundPerformance,
        fundPerformanceLoading: state.fund.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadFundPerformance: (token) => dispatch(loadFundPerformance(token))
    }
}

export default compose(
    withTheme,
    connect(mapStateToProps, mapDispatchToProps)
)(FundPerformance)
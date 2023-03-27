import React from "react"
import axios from 'axios'
import ListOfTeamsStatus from "./ListOfTeamsStatus"
import Loading from "../Loading/Loading";

class TimeLineContainerView extends React.Component {
    state = {
        teams:  [],
        loading: true
    }

    fetchTimeLineItems = () => {
        axios.get(process.env.REACT_APP_URL+"/api/teams/onsite").then(res => {
            this.setState({
                teams: res.data,
                loading: false
            });
        });
    };

    componentDidMount() {
        this.fetchTimeLineItems();
    }

    render() {
        if(!this.state.loading)
            return (<ListOfTeamsStatus data={this.state.teams}/>)
        else
        return (<Loading/>)
    }
}

export default TimeLineContainerView
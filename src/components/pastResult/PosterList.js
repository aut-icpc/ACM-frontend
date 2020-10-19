import React from "react"  
import Poster from "./poster/poster";
import axios from 'axios'
import "../styles/poster.css"

class PosterList extends React.Component { 
    constructor()  { 
        super() 
        this.state = {
            data :[]
        }
        this.fetchContests = this.fetchContests.bind(this)
    }

    fetchContests = () => {
        axios.get(process.env.REACT_APP_URL+"/api/contests").then(res => {
            this.setState({
                data: res.data
            });
        });
    };

    componentDidMount() { 
        this.fetchContests()
    }

    render () {
        const posters = this.state.data.map((contest) => <div className = "columns" key={contest.year}>
            <Poster contest={contest} pastContestProvider = {this.props.pastContestProvider}/></div>)
        return(
            <div className = "sher-box-container2"> 
                <div className="row3">
                    {posters}
                </div>  
                
            </div>
        )
    }
}

export default PosterList
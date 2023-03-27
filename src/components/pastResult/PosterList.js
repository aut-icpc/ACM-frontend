import React from "react"  
import Poster from "./poster/poster";
import axios from 'axios'
import "../styles/poster.css"
import Loading from "../Loading/Loading";

class PosterList extends React.Component { 
    constructor()  { 
        super() 
        this.state = {
            data :[],
            loading :true
        }
        this.fetchContests = this.fetchContests.bind(this)
    }

    fetchContests = () => {
        axios.get(process.env.REACT_APP_URL+"/api/contests").then(res => {
            this.setState({
                data: res.data,
                loading: false
            });
        });
    };

    componentDidMount() { 
        this.fetchContests()
    }

    render () {
        const posters = this.state.data.map((contest) => <div className = "columns" key={contest.year}>
            <Poster contest={contest} pastContestProvider = {this.props.pastContestProvider}/></div>)
        if (this.state.loading)
        {
            return(<div><Loading /></div>)
        }
        else
        {
            return(<div className = "sher-box-container2"> 
                 <div className="row3">
                     {posters}
                 </div>  
                
             </div>
        )
        }

        // return(<div className="load"><Loading /></div>)
    }
}

export default PosterList
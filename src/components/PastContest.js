import React from "react"
import Gallery from "./Gallery";
import PastContestLinkCard from './PastContestLinkCard'
import "./styles/past-contest.css"



class PastContest extends React.Component { 
    render(){
        return(
            <div className = "past-contest-container">
                <div className = "sher-box-container">
                    <div className="contest-row">
                        <div className = "column"><PastContestLinkCard  title ="Online ScoreBoard" url={require("./../img/scoreboard.svg")} link= {this.props.data.OnlineScoreboard}/></div>
                        <div className = "column"><PastContestLinkCard  title ="Problems" url={require("./../img/question.svg")} link= {this.props.data.question} /></div>
                        <div className = "column"><PastContestLinkCard  title ="Onsite ScoreBoard" url={require("./../img/scoreboard.svg")} link= {this.props.data.OsiteScoreboard} /></div>
                    </div>
                </div>

                <div className="photo-wall">
                    <Gallery images = {this.props.data.images} />
                </div>
                <h1></h1>
                
            </div>
        )
    }
}

export default PastContest
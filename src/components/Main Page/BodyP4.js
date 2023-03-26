import React from 'react';
import axios from 'axios';
import "./../styles/sponsor.css"

import Poster from '../../img/acm2.png';
import Sponsor from '../../img/sponsor_bazar.png';
import { Link } from 'react-router-dom';

class BodyP4 extends React.Component { 
    state = {
        poster: null,
        sponsor: null
    }

    fetchCurrentContest() {
        let apiUrl = process.env.REACT_APP_URL + "/api/current";
        axios.get(apiUrl).then(res => {
            this.setState({
                poster: res.data[0].poster,
                sponsor: res.data[0].sponsor
            })
        }).catch(error => {
            console.log(error);
            if(error.response)
                console.log(error.response);
        })
    };

    componentDidMount() { 
        this.fetchCurrentContest()
    }
    
    render() {
        return(
            <div className="part4-container">
                 <div className="new-poster" >
                        <img 
                            // src={process.env.REACT_APP_URL + this.state.poster} 
                            src={Poster}
                            width="300" height="400"
                            alt="poster"
                        />
                </div>
                <div className="part4-inner-container">
                <h1>Event Sponsor</h1>
                <div className="line"/>
                    <div>
                        <div className="sponsor-image">
                            <a href="https://cafebazaar.ir" target="_blank">
                            <img 
                                // src={process.env.REACT_APP_URL + this.state.sponsor} 
                                src = {Sponsor}
                                width ="300" height="200"
                                alt="sponsor"
                            />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BodyP4
import { Component } from "react";

import Navigation from "./extra/navigation";
import Configuration from "./extra/configuration";
import { Helmet,HelmetProvider } from 'react-helmet-async';
import axios from "axios";
import Cookies from "js-cookie";
import TimerFooter from "./extra/timer_footer";
class Achievements extends Component{

    constructor(props) {
        super(props);
        this.state = {
          achievements: [],
        };
      }
    
      componentDidMount() {
        axios
          .get("http://localhost:8081/api/achievements/getAchievements/" + Cookies.get('token'))
          .then((response) => {
            this.setState({ achievements: response.data });
          })
          .catch((error) => {
            console.error(error);
          });
      }
    



    render(){
        const { achievements } = this.state;
        return(
           
            <div>
                <Configuration/>
                <HelmetProvider>
                    <Helmet>
                        <title>{"Pomidoro | Achievements"}</title>
                    </Helmet>
                </HelmetProvider>

                <link rel ="stylesheet" type = "text/css" href="css/achievements.css"/>
                <link rel ="stylesheet" type = "text/css" href="css/extra/navigation.css"/>
                <div className="base_container">
                <Navigation/>
                        
                <main>
                    {achievements.map((achievement, index) => (
                        <div className="group" key={index}>
                            <img
                            className="achievement_icon"
                            src="images/achievement_page/achievement.svg"
                            alt=""/>
                            <div className="achievement_text">{achievement.description}</div>
                        </div>
                    ))}
                </main>
                  <TimerFooter/>
                </div>
            
            </div>
            );

    }
        


}

export default Achievements;
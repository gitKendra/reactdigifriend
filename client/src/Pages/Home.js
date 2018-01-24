import React, { Component } from 'react'
import Jumbotron from '../components/Jumbotron';

class Home extends Component {

	render() {
			return(
					<div>
							<Jumbotron
									title="Digital Friend & Bot" 
									body="Custom commands and an interactive digital friend for Twitch streamers."
							/>
							<div className="container">
									<div className="row">
											<div className="col">
													<div className="card mt-2">
															<div className="card-body">
																	<div className="text-center">
																			<h4 className="font-up">About DigiFriend</h4>
																			<p>DigiFriend is a digital friend and tool for those who stream on Twitch to make their stream more interactive.</p>
																			<p>DigiFriend provides a way for viewers to interact with your stream by listening to messages in chat and responding to their message on video, through an overlay, and in chat</p>
																	</div>
															</div>
													</div>
											</div>

											<div className="col">
													<div className="card mt-2">
															<div className="card-body">
																	<div className="text-center">
																			<h4 className="font-up">DigiFriends</h4>
																			<p>DigiFriend gives you the option of several different digital friends, or digifriends, to use on stream. Each digifriend has its own custom graphics and commands that you can choose from.</p>
																	</div>
															</div>
													</div>
											</div>

											<div className="col">
													<div className="card mt-2">
															<div className="card-body">
																	<div className="text-center">
																			<h4 className="font-up">Custom Commands</h4>
																			<p>DigiFriend allows you, the streamer, to create your own custom commands or keywords and the response that the bot will say in chat. Be as fun or creative as you like!</p>
																	</div>
															</div>
													</div>
											</div>
									</div>
							</div>
							
					</div>
			)
	}
}

export default Home;
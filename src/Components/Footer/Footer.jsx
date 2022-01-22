import React, { Component } from 'react';
import './Style/footer.css';
import LinkedinIcon from './Pictures/linkedin.svg';
import FiverrIcon from './Pictures/fiverr.svg';
import XingIcon from './Pictures/xing.svg';
import GithubIcon from './Pictures/github.svg';
class Footer extends Component {
	render() {
		return (
			<div className='container-fluid backgroundLight mt-5 px-0'>
				<div className='seperator m-0 p-0'></div>

				{/*Links*/}
				<div className='row '>
					<div className='col'></div>
					<div className='col-sm-4 d-flex justify-content-center'>
						<p className='display-6 fs-5 pt-3'>
							<b style={{ color: 'grey' }}>Visit me:</b>
						</p>
					</div>
					<div className='col'></div>
					<div className='col-sm-4 col-lg-6 d-flex justify-content-center'>
						<a href='https://www.xing.com/profile/Florian_Erwerth'>
							<img
								src={XingIcon}
								alt='Xing'
								width='40px'
								height='40px'
								className='pt-3 float-sm-end'
							></img>
						</a>
						<a href='https://github.com/ErwerthFlorian'>
							<img
								src={GithubIcon}
								alt='GitHub'
								width='45px'
								height='45px'
								style={{ transform: `translateY(-2.5px)` }}
								className='pt-3 float-sm-end'
							></img>
						</a>
						<a href='https://www.fiverr.com/erwerth?public_mode=true'>
							<img
								src={FiverrIcon}
								alt='Fiverr'
								width='40px'
								height='40px'
								className='pt-3 float-sm-end'
							></img>
						</a>
						<a href='https://www.linkedin.com/in/florian-erwerth-114331218'>
							<img
								src={LinkedinIcon}
								alt='LinkedIn'
								width='40px'
								height='40px'
								className='pt-3 float-sm-end'
							></img>
						</a>
					</div>

					<div className='col p-lg-0'></div>
				</div>

				<div className='row'>
					<div className='col'></div>
					<div className='col-10'>
						<hr className='bg-light' />
					</div>
					<div className='col'></div>
				</div>

				<div className='row ' style={{ paddingBottom: 50 }}>
					<div className='col'></div>
					<div className='col-10 text-light'>
						<div className='row'>
							<div className='col-lg-3 font-orange col-md-12 d-flex justify-content-center text-center'>
								Name: Florian Erwerth
							</div>
							<div className='col-lg-3 font-orange col-md-12 d-flex justify-content-center text-center'>
								Address: Kafkastraße 18, <br />
								81737 München
							</div>
							<div className='col-lg-3 font-orange col-md-12 d-flex justify-content-center text-center'>
								E-Mail: erwerthflorian@outlook.de
							</div>
							<div className='col-lg-3 font-orange col-md-12 d-flex justify-content-center text-center'>
								Phone: +49 157 30 24 34 60
							</div>
						</div>
					</div>
					<div className='col'></div>
				</div>
			</div>
		);
	}
}

export default Footer;

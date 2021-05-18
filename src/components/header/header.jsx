import React from 'react';
import './header.scss';

// Components
import { ReactComponent as Speaker } from '../../assets/icons/speaker.svg';
import { ReactComponent as Man } from '../../assets/icons/manWithGlasses.svg';
import { ReactComponent as Experiment } from '../../assets/icons/experiment.svg';
import { ReactComponent as Lab } from '../../assets/icons/lab.svg';
import { ReactComponent as Swimmer } from '../../assets/icons/swimmer.svg';
import { ReactComponent as Astronomy } from '../../assets/icons/astronomy.svg';
import { ReactComponent as Key } from '../../assets/icons/key.svg';
import { ReactComponent as Idea } from '../../assets/icons/idea.svg';

function Header() {
	return (
		<div className="header">
			<div className="header-icons">
				<Speaker className="header-icon" />
				<Experiment className="header-icon" />
				<Astronomy className="header-icon" />
				<Key className="header-icon" />
			</div>
			<div className="header-title">
				<h1>LWS Quizz File Generator</h1>
				{/* <h2>Isadora</h2> */}
			</div>
			<div className="header-icons">
				<Man className="header-icon" />
				<Lab className="header-icon" />
				<Swimmer className="header-icon" />
				<Idea className="header-icon" />
			</div>
		</div>
	);
}

export default Header;

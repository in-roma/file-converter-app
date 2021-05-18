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
import { ReactComponent as Paint } from '../../assets/icons/paint.svg';
import { ReactComponent as Music } from '../../assets/icons/music.svg';

function Header() {
	return (
		<div className="header">
			<div className="header-icons-start">
				<Speaker className="header-icon-left" />
				<Experiment className="header-icon-left" />
				<Astronomy className="header-icon-left" />
				<Key className="header-icon-left" />
				<Music className="header-icon-left" />
			</div>
			<div className="header-title">
				<h1>Trivia File Generator</h1>
				{/* <h2>Isadora</h2> */}
			</div>
			<div className="header-icons-end">
				<Man className="header-icon-right " />
				<Paint className="header-icon-right " />
				<Swimmer className="header-icon-right " />
				<Idea className="header-icon-right " />
				<Lab className="header-icon-right " />
			</div>
		</div>
	);
}

export default Header;

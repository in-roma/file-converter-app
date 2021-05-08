import React from 'react';
import './controlCategories.scss';

//Components
import Button from '../button/button';

export default function ControlCategories({
	category,
	categories,
	addCategory,
	selectCategory,
}) {
	return (
		<div className="controlCategories-bar">
			<Button buttonName="Create Category" onClick={addCategory} />
			{categories.map((el) => (
				<div
					id={el.id}
					key={`category${el.id}`}
					onClick={selectCategory}
					className={
						parseInt(category) === el.id
							? 'category-btn-selected'
							: 'category-btn'
					}
				>
					<span>Category {parseInt(el.id) + 1} </span>
				</div>
			))}
		</div>
	);
}

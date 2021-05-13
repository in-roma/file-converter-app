import React from 'react';
import './category.scss';

export default function Category({
	id,
	category,
	categoryName,
	selectCategory,
}) {
	return (
		<div
			id={id}
			onClick={selectCategory}
			className={
				parseInt(category) === id
					? 'category-btn-selected'
					: 'category-btn'
			}
		>
			<span>{categoryName} </span>
		</div>
	);
}

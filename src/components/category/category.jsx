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
			fakeId={0}
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

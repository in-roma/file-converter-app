import React from 'react';
// StyleSheet
import './confirmationWindow.scss';

export default function ConfirmationWindow({
	message,
	deleteElement,
	closeWindow,
	btnLabel,
}) {
	return (
		<div className="confirmation-Window">
			<div action="" className="confirmation-Window-elements">
				<div className="category-window-buttons">
					<span>{message}</span>
					<div className="cancel-category-btn" onClick={closeWindow}>
						<span>Cancel</span>
					</div>
					<div
						className="confirmation-category-btn"
						onClick={deleteElement}
					>
						{btnLabel}
					</div>
				</div>
			</div>
		</div>
	);
}

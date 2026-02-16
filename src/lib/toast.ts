// Toast notification utility

let toastTimeout: number | null = null;

export function showToast(message: string, duration: number = 3000): void {
	// Remove any existing toast
	const existingToast = document.querySelector('.toast-notification');
	if (existingToast) {
		existingToast.remove();
	}

	// Clear any pending timeout
	if (toastTimeout) {
		clearTimeout(toastTimeout);
	}

	// Create toast element
	const toast = document.createElement('div');
	toast.className = 'toast-notification';
	toast.textContent = message;

	// Add to DOM
	document.body.appendChild(toast);

	// Trigger vibration if supported
	if ('vibrate' in navigator) {
		navigator.vibrate([50, 50, 50]); // Triple vibration pattern
	}

	// Animate in
	requestAnimationFrame(() => {
		toast.classList.add('show');
	});

	// Auto-hide after duration
	toastTimeout = window.setTimeout(() => {
		toast.classList.remove('show');
		// Remove from DOM after animation
		setTimeout(() => {
			if (toast.parentNode) {
				toast.parentNode.removeChild(toast);
			}
		}, 300);
	}, duration);
}

// Multi-click handler utility
export function createMultiClickHandler(
	element: HTMLElement,
	requiredClicks: number,
	callback: () => void,
	resetDelay: number = 1000
): () => void {
	let clickCount = 0;
	let resetTimeout: number | null = null;

	const handleClick = () => {
		clickCount++;

		// Clear existing reset timeout
		if (resetTimeout) {
			clearTimeout(resetTimeout);
		}

		// Check if required clicks reached
		if (clickCount >= requiredClicks) {
			clickCount = 0;
			callback();
		} else {
			// Reset click count after delay
			resetTimeout = window.setTimeout(() => {
				clickCount = 0;
			}, resetDelay);
		}
	};

	element.addEventListener('click', handleClick);

	// Return cleanup function
	return () => {
		element.removeEventListener('click', handleClick);
		if (resetTimeout) {
			clearTimeout(resetTimeout);
		}
	};
}

import Swal from 'sweetalert2';
import { defAxios } from './constants';

const swalWithCustomButtons = Swal.mixin({
	customClass: {
		confirmButton: 'btn btn-outline-success',
		cancelButton: 'btn btn-outline-danger',
	},
	buttonsStyling: false,
});

export const createToast = Swal.mixin({
	toast: true,
	position: 'top-right',
	showConfirmButton: false,
	timer: 1500,
	timerProgressBar: true,
	didOpen: toast => {
		toast.addEventListener('mouseenter', Swal.stopTimer);
		toast.addEventListener('mouseleave', Swal.resumeTimer);
	},
});

export const removeTranslationById = (id: string | number, functionAfterRemove?: () => void) => {
	swalWithCustomButtons
		.fire({
			text: 'Are you sure you want to delete the translation?',
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
			cancelButtonText: 'No, cancel!',
		})
		.then(result => {
			if (result.isConfirmed) {
				defAxios.delete(`Translation/${id}`).then(() => {
					functionAfterRemove && functionAfterRemove();
					createToast.fire({
						icon: 'success',
						title: 'Deleted!',
						text: `Your translation has been deleted`,
					});
				});
			} else if (result.isDismissed) return;
		});
};

export const removeTextById = (id: string | number, functionAfterRemove?: () => void) => {
	swalWithCustomButtons
		.fire({
			text: 'Are you sure you want to delete the text?',
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
			cancelButtonText: 'No, cancel!',
		})
		.then(result => {
			if (result.isConfirmed) {
				defAxios.delete(`Post/${id}`).then(() => {
					functionAfterRemove && functionAfterRemove();
					createToast.fire({
						icon: 'success',
						title: 'Deleted!',
						text: `Your text has been deleted`,
					});
				});
			} else if (result.isDismissed) return;
		});
};

export const addTextWaring = (functionAfterRemove?: () => void) => {
	swalWithCustomButtons
		.fire({
			title: 'Your text contains only one section!',
			text: 'To fix it go back and add spaces between paragraphs',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Add it anyway',
			cancelButtonText: 'Let me fix it',
		})
		.then(result => {
			if (result.isConfirmed) functionAfterRemove && functionAfterRemove();
			else if (result.isDismissed) return;
		});
};

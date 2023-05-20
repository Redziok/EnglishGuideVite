import { AddTranslation } from './AddTranslation';
import { TranslationDetails } from './TranslationDetails';
import { useSelector } from 'react-redux';
import { selectPost } from '../../stores/store';
import { LoadingComponent } from '../../components/LoadingComponent';

interface ITranslationPopupProps {
	popupPosition: number;
	isTranslationLoading: boolean;
}

export const TranslationPopup = ({ popupPosition, isTranslationLoading }: ITranslationPopupProps) => {
	const { sectionId, translations } = useSelector(selectPost);
	const translation = translations.find(t => t.sectionId === sectionId);

	return (
		<div className='text-page-translation-wrapper'>
			<div className='text-page-translation' style={{ top: `${popupPosition}px` }}>
				{!isTranslationLoading ? translation != null ? <TranslationDetails translation={translation} /> : <AddTranslation /> : <LoadingComponent />}
			</div>
		</div>
	);
};

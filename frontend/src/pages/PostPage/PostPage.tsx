import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePost } from '../../hooks/usePost';
import { LoadingComponent } from '../../components/LoadingComponent';
import { TranslationPopup } from './TranslationPopup';
import { PostHeader } from './PostPanel/PostHeader';
import { selectPost } from '../../stores/store';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslations } from '../../hooks/useTranslations';
import { updateState } from '../../stores/reducers/postReducer';
import { createToast } from '../../components/utils';

export const PostPage = () => {
	const { postId } = useParams();
	const dispatch = useDispatch();
	const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
	const [popupPosition, setPopupPosition] = useState<number>(0);
	const { post, language, sectionId, translations } = useSelector(selectPost);
	const { isTextLoading } = usePost({ postId });
	const { isTranslationLoading } = useTranslations({ language, postId });
	const textSplited = post?.text.split(/\r?\n\r?\n/) ?? [];

	useEffect(() => {
		setIsPopupVisible(false);
	}, [language, postId]);

	const handleTextClick = (e: React.MouseEvent<HTMLParagraphElement>, idx: number) => {
		if (!language)
			return createToast.fire({
				title: 'Language not chosen',
				icon: 'error',
				timer: 2000,
			});

		setPopupPosition(e.currentTarget.offsetTop - 200);
		setIsPopupVisible(true);
		dispatch(updateState({ sectionId: idx }));
	};

	return (
		<div className='text-page-container'>
			<div className='text-page-preview'>
				<PostHeader />
				<hr />
				{isTextLoading ? (
					<LoadingComponent />
				) : (
					<div className='text-page-preview-text'>
						{textSplited.map((section, idx) => {
							const sectionKey = `text-container-section-${idx}`;
							const hasTranslation = translations.some(t => t.sectionId === idx);
							const sectionClasses = `text-containers ${hasTranslation ? 'has-translation' : ''} ${sectionId === idx ? 'is-translating' : ''}`;

							return (
								<p id={sectionKey} className={sectionClasses} key={idx} onClick={e => handleTextClick(e, idx)}>
									{section}
								</p>
							);
						})}
					</div>
				)}
			</div>
			{isPopupVisible && <TranslationPopup popupPosition={popupPosition} isTranslationLoading={isTranslationLoading} />}
		</div>
	);
};

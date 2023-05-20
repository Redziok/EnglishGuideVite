import { Link } from 'react-router-dom';
import { IPost } from '../../components/DataTypes';

interface ITextElements {
	text: IPost;
}

export const TextElements = ({ text }: ITextElements) => {
	return (
		<Link to={`/Post/${text.id}`} key={text.id}>
			<div className='text-list-element' key={text.id}>
				<div className='text-list-title-container'>
					{text.title}
					<p className='text-page-preview-language'>{text.language}</p>
				</div>
				<p className='text-list-user'>by {text.login}</p>
			</div>
		</Link>
	);
};

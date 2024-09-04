import { useClickAway } from '@uidotdev/usehooks';

import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	ArticleStateType,
	OptionType,
	defaultArticleState,
} from 'src/constants/articleProps';

import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Separator } from 'components/separator';
import { Text } from 'components/text';
import { Select } from 'components/select';
import { RadioGroup } from 'components/radio-group';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, MutableRefObject, useState } from 'react';
import clsx from 'clsx';

type TArticleState = {
	setArticleState: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ setArticleState }: TArticleState) => {
	const [formIsOpen, setFormIsOpen] = useState<boolean>(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const ref: MutableRefObject<HTMLElement> | null = useClickAway(() => {
		setFormIsOpen(false);
	});

	const handleOnClick = () => {
		setFormIsOpen((prevState) => !prevState);
	};

	const changeParams = (optionName: string) => (option: OptionType) => {
		setFormState((prevState) => ({ ...prevState, [optionName]: option }));
	};

	const handleReset = (event: FormEvent) => {
		event.preventDefault();

		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();

		setArticleState(formState);
		setFormIsOpen(false);
	};

	return (
		<>
			<ArrowButton isOpen={formIsOpen} onClick={handleOnClick}/>
			<aside className={clsx(styles.container, formIsOpen && styles.container_open)}
				ref={ref}>
				<form className={styles.form}
				onSubmit={handleSubmit} onReset={handleReset}>
					<Text as={'h2'} size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
					title={'Шрифт'}
					selected={formState.fontFamilyOption}
					options={fontFamilyOptions}
					onChange={changeParams('fontFamilyOption')}
					/>
					<RadioGroup
					title={'Размер шрифта'}
					name={'Размер шрифта'}
					selected={formState.fontSizeOption}
					options={fontSizeOptions}
					onChange={changeParams('fontSizeOption')}
					/>
					<Select
					title={'Цвет шрифта'}
					selected={formState.fontColor}
					options={fontColors}
					onChange={changeParams('fontColor')}
					/>
					<Separator />
					<Select
					title={'Цвет фона'}
					selected={formState.backgroundColor}
					options={backgroundColors}
					onChange={changeParams('backgroundColor')}
					/>
					<Select
					title={'Ширина контента'}
					selected={formState.contentWidth}
					options={contentWidthArr}
					onChange={changeParams('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};

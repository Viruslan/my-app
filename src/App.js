import { useState } from 'react';
import styles from './App.module.css';

const buttons = [
	{ value: '7' },
	{ value: '8' },
	{ value: '9' },
	{ value: '–' },
	{ value: '4' },
	{ value: '5' },
	{ value: '6' },
	{ value: '+' },
	{ value: '1' },
	{ value: '2' },
	{ value: '3' },
	{ value: '=', style: styles.result },
	{ value: '0', style: styles.zero },
	{ value: 'c', style: styles.clear },
];

export const App = () => {
	const [calc, setCalc] = useState('');
	const [output, setOutput] = useState('');
	const [stylesText, setStylesText] = useState({});
	const [act, setAct] = useState('');
	const [previous, setPrevious] = useState('');
	const [current, setCurrent] = useState('');
	const updateCalc = (value) => {
		switch (value) {
			case 'c':
				setCalc('');
				setOutput('');
				setAct('');
				setPrevious('');
				setCurrent('');
				break;
			case '+':
				setPrevious(calc);
				setOutput(calc + '+');
				setAct('+');
				setCalc('');
				setCurrent('');
				break;
			case '–':
				setPrevious(calc);
				setOutput(calc + '-');
				setAct('-');
				setCalc('');
				setCurrent('');
				break;
			case '=':
				setStylesText({ color: 'green' });
				setOutput(output + calc + '=');
				if (current === '') {
					setCurrent(calc);
					if (act === '+') setCalc(Number(previous) + Number(calc));
					if (act === '-') setCalc(Number(previous) - Number(calc));
				} else {
					if (act === '+') setCalc(Number(calc) + Number(current));
					if (act === '-') setCalc(Number(calc) - Number(current));
					setPrevious(calc);
				}

				break;
			default:
				setStylesText({});
				setCalc(calc + value);
		}
	};
	return (
		<div className={styles.container}>
			<form className={styles.calculator}>
				<div className={styles.value}>
					<input
						type="text"
						className={styles.output}
						readOnly
						value={output}
					></input>
					<input
						type="text"
						className={styles.input}
						style={stylesText}
						readOnly
						value={calc}
					></input>
				</div>
				{buttons.map(({ value, style }) => (
					<span
						key={value}
						className={`${styles.button} ${style}`}
						onClick={() => updateCalc(value)}
					>
						<i>{value}</i>
					</span>
				))}
			</form>
		</div>
	);
};

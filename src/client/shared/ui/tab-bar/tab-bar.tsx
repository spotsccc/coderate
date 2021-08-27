import React from 'react'
import { TabButton } from './ui'

export type OptionCfg<Option> = {
	id: Option
	text: string
}

export type TabBarProps<Option> = {
	onButtonClick: (v: Option) => void
	options: OptionCfg<Option>[]
	selectedOption: Option
}

export const TabBar = <Option,>(props: TabBarProps<Option>) => (
	<div>
		{props.options.map((opt) => (
			<TabButton
				//@ts-ignore
				key={opt.id}
				selected={props.selectedOption === opt.id}
				onClick={() => props.onButtonClick(opt.id)}
			>
				{opt.text}
			</TabButton>
		))}
	</div>
)

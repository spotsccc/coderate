import React, { FC } from "react";

export const renderIf = <Props,>(Component: FC<Props>) => (props: Props & {renderIf: boolean}) => (<>
	{props.renderIf && <Component {...props}/>}
</>)

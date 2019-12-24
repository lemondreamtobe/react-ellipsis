import * as React from 'react';
interface TextOverflowOptions {
    str?: string;
    autoUpdate?: boolean;
    trim?: boolean;
    title?: boolean;
    className?: string;
    wholeWord?: boolean;
}
declare class OverflowWord extends React.Component<any> {
    private overflowWord;
    rtrim: (str: string) => string;
    getPropertyName: () => "data" | "textContent";
    domSplit: (root: any, maxIndex: any, options: any) => any;
    textOverflow: (options?: TextOverflowOptions) => void;
    componentDidMount(): void;
    render(): JSX.Element;
}
export default OverflowWord;

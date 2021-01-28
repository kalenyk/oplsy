import React from 'react';
import Form from '../Form';
import Graph from '../Graph';

interface IProps {

}
interface INode {
    inPorts: number;
    outPorts: number;
}
interface IState {
    nodes: INode[]
}
export default class Container extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            nodes: [],
        }
    }

    onSubmit = (inPorts: number, outPorts: number) => {
        this.setState((prevState) => ({
            nodes: [...prevState.nodes, { inPorts, outPorts }]
        }))
    }
    render() {
        return (
            <>
                <Form
                    onSubmit={this.onSubmit}
                />
                <Graph
                    nodes={this.state.nodes}
                />
            </>
        )
    }
}
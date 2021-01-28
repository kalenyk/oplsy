import React from 'react';
import ReactDOM from 'react-dom';

import * as joint from 'jointjs';
import difference from 'lodash/difference';


interface INode {
    inPorts: number;
    outPorts: number;
}
interface IProps {
    nodes: INode[]
}
interface INodePosition {
    x: number;
    y: number;
}

type PORTS = 'in' | 'out';

const portsConfig = {
    groups: {
        'in': {
            attrs: {
                '.port-body': {
                    fill: '#16A085',
                    magnet: 'passive'
                },
                '.port-label': {
                    fill: "transparent"
                }
            }
        },
        'out': {
            attrs: {
                '.port-body': {
                    fill: '#E74C3C'
                },
                '.port-label': {
                    fill: "transparent"
                }
            }
        }
    }
};

const generateNodePosition = ():INodePosition => {
    return {
        x: Math.floor(Math.random() * 650),
        y: Math.floor(Math.random() * 650)
    }
}
export default class Graph extends React.PureComponent<IProps> {
    graph: any;
    paper: any;
    constructor(props: IProps) {
        super(props);
        this.graph = new joint.dia.Graph();
        this.state = {
            lastPosition: 0
        };
    }
        

    componentDidMount() {
        this.paper = new joint.dia.Paper({
            el: ReactDOM.findDOMNode(this.refs.placeholder),
            width: 700,
            height: 700,
            model: this.graph,
            defaultLink: new joint.dia.Link({
                attrs: { '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' } },
            }),
            validateConnection: function(cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
                // Prevent linking from input ports.
                if (magnetS && magnetS.getAttribute('port-group') === 'in') return false;
                // Prevent linking from output ports to input ports within one element.
                if (cellViewS === cellViewT) return false;
                // Prevent linking to input ports.
                return magnetT && magnetT.getAttribute('port-group') === 'in';
            },
            // Enable marking available cells & magnets
            markAvailable: true,
        });
    }

    componentDidUpdate(prevProps: IProps) {
        if(this.props.nodes.length !== prevProps.nodes.length) {
            const result: any = difference(this.props.nodes, prevProps.nodes);
            const { inPorts, outPorts } = result[0];
            this.addNode(inPorts, outPorts)
        }
    }
    addNode(inPorts: number, outPorts: number) {

        const createArr = (length: number, portType: PORTS): string[] => {
            return Array.from({ length }, (_, i) => String(portType + (i + 1)));
        }
        const a1 = new joint.shapes.devs.Atomic({
            position: generateNodePosition(),
            inPorts: createArr(inPorts, 'in'),
            outPorts: createArr(outPorts, 'out'),
            ports: portsConfig,
            attrs: {
                '.label': { text: `#${this.props.nodes.length}`, 'ref-x': .5, 'ref-y': .2 },
                rect: { fill: '#2ECC71' }
            }
        });

        this.graph.addCells([a1]);
    }


    render() {
        return (
            <div id="playground" ref="placeholder">
            </div>);
    }
}
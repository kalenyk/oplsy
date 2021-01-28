import React from 'react';

interface IProps {
    onSubmit(inPort: number, outPorts: number): void
}
export default class Form extends React.Component<IProps> {
    myFormRef: any;
    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const inPorts = form[0] as HTMLInputElement;
        const outPorts = form[1] as HTMLInputElement;

        this.props.onSubmit(Number(inPorts.value), Number(outPorts.value))
        this.myFormRef.reset();
    }
    render() {
        return (
            <form className='form-wrap' onSubmit={this.handleSubmit}  ref={(el) => this.myFormRef = el}>
                <label>
                    <span>In Ports</span>
                    <input type='number' name='inPorts' min='1' max='4'/>
                </label>
                <label>
                    <span>Out Ports</span>
                    <input type='number' name='outPorts' min='1' max='4'/>
                </label>
                <button type='submit'>Add Node</button>
            </form>
        )
    }
}
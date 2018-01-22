class CanvasComponent extends React.Component {
    componentDidMount() {
        this.updateCanvas();
    }
    updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.fillRect(0,0, 100, 100);
    }
    render() {
        return (
            <canvas ref="canvas" width={500} height={500}/>
        );
    }
}
ReactDOM.render(<CanvasComponent/>, document.getElementById('canvasDiv'));
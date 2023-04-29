import { Component } from "react";

import Error from "../errorGif/ErrorGif";

class ErrorBoundary extends Component {
    state = {
        error: false
    }

    componentDidCatch(errorMassage) {
        console.error(errorMassage)
        this.setState({error: true})
    }

    render() {
        if(this.state.error) return <Error />
        return this.props.children
    }
}

export default ErrorBoundary
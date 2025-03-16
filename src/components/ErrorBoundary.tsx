import { Component, ReactNode } from 'react';
import { Result, Button } from 'antd';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    handleRefresh = () => {
        this.setState({ hasError: false });
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <Result
                    status="500"
                    title="Something went wrong"
                    subTitle="Please try refreshing the page or contact support if the issue persists."
                    extra={
                        <Button type="primary" onClick={this.handleRefresh}>
                            Refresh Page
                        </Button>
                    }
                />
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

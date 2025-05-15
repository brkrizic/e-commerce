import React from 'react';
import { Alert, Button } from 'react-bootstrap';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Caught in ErrorBoundary:', error, errorInfo);
    // You can log to an external service here
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="d-flex flex-column justify-content-center align-items-center mt-5">
          <Alert variant="danger" className="w-50 text-center">
            <Alert.Heading>Oops! Something went wrong.</Alert.Heading>
            <p>{this.state.error?.message || 'Unknown error occurred.'}</p>
            <Button variant="primary" onClick={this.handleReload}>Reload Page</Button>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

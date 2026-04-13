import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('[App Error] Uncaught JavaScript error –', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container py-5 text-center">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="mb-4">
                <i className="bi bi-exclamation-triangle text-danger" style={{ fontSize: '5rem' }}></i>
              </div>
              <h2 className="fw-bold mb-3">Something went wrong</h2>
              <p className="text-muted mb-4">
                An unexpected error occurred. Please try refreshing the page.
              </p>
              <button
                className="btn btn-primary px-5"
                onClick={() => {
                  window.location.href = '/';
                }}
              >
                <i className="bi bi-arrow-clockwise me-2"></i>Go to Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

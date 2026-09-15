import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Phone } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in TripVora application:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6 text-stone-900 font-sans">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border-2 border-amber-300 shadow-xl text-center space-y-5">
            <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-serif-display font-bold text-stone-900">
                TripVora Travels Kashmir
              </h2>
              <p className="text-sm text-stone-600">
                We encountered a temporary display issue while loading the application.
              </p>
            </div>

            <div className="p-3 bg-stone-100 rounded-xl text-xs font-mono text-stone-700 text-left overflow-x-auto max-h-24">
              {this.state.error?.message || 'Unknown render exception'}
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => window.location.reload()}
                className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-colors flex items-center justify-center space-x-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Application</span>
              </button>

              <a
                href="tel:7006644364"
                className="inline-flex items-center space-x-2 text-xs font-semibold text-emerald-800 hover:underline"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Direct 24x7 Assistance: 7006644364</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

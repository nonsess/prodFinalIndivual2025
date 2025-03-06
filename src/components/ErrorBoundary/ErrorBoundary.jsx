import { Component } from 'react';

import { Result, Button } from 'antd';

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Произошла ошибка:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Result
                        status="error"
                        title="Что-то пошло не так"
                        subTitle="Приносим извинения за неудобства"
                        extra={[
                            <Button 
                                type="primary" 
                                key="reload"
                                onClick={() => window.location.reload()}
                            >
                                Перезагрузить страницу
                            </Button>
                        ]}
                    />
                </div>
            );
        }

        return this.props.children;
    }
} 
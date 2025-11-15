import React, { type ReactNode } from "react";
import "./Layout.css";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="layout">
            <header className="layout-header">
                Muscle Learner
            </header>

            <main className="layout-main">
                {children}
            </main>

            <footer className="layout-footer">
                Muscle Learner © 2025
            </footer>
        </div>
    );
};

export default Layout;